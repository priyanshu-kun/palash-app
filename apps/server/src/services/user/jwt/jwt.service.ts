import jwt, {SignOptions, VerifyErrors, VerifyOptions, JwtPayload} from 'jsonwebtoken';
import { jwtKeysConfig } from "../../../config/jwt/index.js";

class JWTService {
    private readonly secretKey: string;
    private readonly accessTokenSignOptions: SignOptions;
    private readonly refreshTokenSignOptions: SignOptions;
    private readonly verifyOptions: VerifyOptions;

    constructor() {
        try {
            this.secretKey = jwtKeysConfig.secretKey;
            
            if (!this.secretKey) {
                throw new Error('JWT secret key is not configured');
            }

            this.accessTokenSignOptions = {
                algorithm: 'HS256',
                expiresIn: '7d'
            };

            this.refreshTokenSignOptions = {
                algorithm: 'HS256',
                expiresIn: '14d'
            };

            this.verifyOptions = {
                algorithms: ["HS256"]
            };
        } catch (error) {
            console.error('Error initializing JWT service:', error);
            throw error;
        }
    }

    async generateToken(phoneOrEmail: string, role: 'USER' | 'ADMIN'): Promise<{ token: string | undefined, expireAt: Date }> {
        return new Promise((resolve, reject) => {
            jwt.sign({phoneOrEmail, role}, this.secretKey, this.accessTokenSignOptions, (err: Error | null, encoded: string | undefined) => {
                if(err === null && encoded !== undefined) {
                    const expirySeconds = this.getExpirySeconds(this.accessTokenSignOptions.expiresIn);
                    const expireAt = new Date();
                    expireAt.setSeconds(expireAt.getSeconds() + expirySeconds);
                    resolve({token: encoded, expireAt});
                }
                else {
                    reject(err);
                }
            });
        });
    }

    async generateTokenPair(userId: string, phoneOrEmail: string, role: 'USER' | 'ADMIN'): Promise<{ accessToken: string, refreshToken: string, accessExpireAt: Date, refreshExpireAt: Date }> {
        const accessToken = await this.generateAccessToken(userId, phoneOrEmail, role);
        const refreshToken = await this.generateRefreshToken(userId, phoneOrEmail, role);
        
        return {
            accessToken: accessToken.token,
            refreshToken: refreshToken.token,
            accessExpireAt: accessToken.expireAt,
            refreshExpireAt: refreshToken.expireAt
        };
    }

    private async generateAccessToken(userId: string, phoneOrEmail: string, role: 'USER' | 'ADMIN'): Promise<{ token: string, expireAt: Date }> {
        return new Promise((resolve, reject) => {
            jwt.sign(
                { userId, phoneOrEmail, role, tokenType: 'access' },
                this.secretKey,
                this.accessTokenSignOptions,
                (err: Error | null, encoded: string | undefined) => {
                    if(err === null && encoded !== undefined) {
                        const expirySeconds = this.getExpirySeconds(this.accessTokenSignOptions.expiresIn);
                        const expireAt = new Date();
                        expireAt.setSeconds(expireAt.getSeconds() + expirySeconds);
                        resolve({token: encoded, expireAt});
                    }
                    else {
                        reject(err);
                    }
                }
            );
        });
    }

    private async generateRefreshToken(userId: string, phoneOrEmail: string, role: 'USER' | 'ADMIN'): Promise<{ token: string, expireAt: Date }> {
        return new Promise((resolve, reject) => {
            jwt.sign(
                { userId, phoneOrEmail, role, tokenType: 'refresh' },
                this.secretKey,
                this.refreshTokenSignOptions,
                (err: Error | null, encoded: string | undefined) => {
                    if(err === null && encoded !== undefined) {
                        const expirySeconds = this.getExpirySeconds(this.refreshTokenSignOptions.expiresIn);
                        const expireAt = new Date();
                        expireAt.setSeconds(expireAt.getSeconds() + expirySeconds);
                        resolve({token: encoded, expireAt});
                    }
                    else {
                        reject(err);
                    }
                }
            );
        });
    }

    async verifyToken(token: string): Promise<JwtPayload & {userId?: string, phoneOrEmail: string | undefined; role: 'USER' | 'ADMIN'; tokenType?: string;} | null> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.secretKey, this.verifyOptions, (err: VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
                if(err === null && decoded !== undefined) {
                    const d = decoded as JwtPayload & {
                        userId?: string;
                        phoneOrEmail: string | undefined;
                        role: 'USER' | 'ADMIN';
                        tokenType?: string;
                    };
                    if(d.phoneOrEmail) {
                        resolve(d);
                        return;
                    }
                }
                resolve(null);
            });
        });
    }

    async verifyAccessToken(token: string): Promise<JwtPayload & {userId?: string, phoneOrEmail: string | undefined; role: 'USER' | 'ADMIN';} | null> {
        const payload = await this.verifyToken(token);
        if (payload && payload.tokenType === 'access') {
            return payload;
        }
        return null;
    }

    async verifyRefreshToken(token: string): Promise<JwtPayload & {userId?: string, phoneOrEmail: string | undefined; role: 'USER' | 'ADMIN';} | null> {
        const payload = await this.verifyToken(token);
        if (payload && payload.tokenType === 'refresh') {
            return payload;
        }
        return null;
    }

    private getExpirySeconds(expiresIn: string | number | undefined): number {
        if (typeof expiresIn === 'number') {
            return expiresIn;
        }
        
        if (typeof expiresIn === 'string') {
            const unit = expiresIn.slice(-1);
            const value = parseInt(expiresIn.slice(0, -1));
            
            switch (unit) {
                case 's': return value;
                case 'm': return value * 60;
                case 'h': return value * 60 * 60;
                case 'd': return value * 24 * 60 * 60;
                default: 
                    if (!isNaN(parseInt(expiresIn))) {
                        return parseInt(expiresIn);
                    }
                    return 60 * 15; // Default to 15 minutes if format is unknown
            }
        }
        
        return 60 * 15; // Default to 15 minutes if undefined
    }
}

export default JWTService;