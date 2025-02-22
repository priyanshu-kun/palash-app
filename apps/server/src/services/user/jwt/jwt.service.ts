import fs from "fs";
import jwt, {SignOptions, VerifyErrors, VerifyOptions, PrivateKey, JwtPayload} from 'jsonwebtoken'
import { jwtKeysConfig } from "../../../config/jwt/index.js";

class JWTService {
    private readonly privateKey: Buffer;
    private readonly privateKeySecret: PrivateKey;
    private readonly signInOptions: SignOptions;
    private readonly publicKey: Buffer;
    private readonly verifyOptions: VerifyOptions;
    constructor() {
       this.privateKey = fs.readFileSync(jwtKeysConfig.privateKeyFile); 
       this.privateKeySecret = {
        key: this.privateKey,
        passphrase: jwtKeysConfig.privateKeyPassphrase
       }
       this.signInOptions = {
        algorithm: 'RS256',
        expiresIn: '14d'
       }
       this.publicKey = fs.readFileSync(jwtKeysConfig.publicKeyFile);       
       this.verifyOptions = {
        algorithms: ["RS256"]
       }
    }
    generateToken(phoneOrEmail: string, role: 'USER' | 'ADMIN'): Promise<{ token: string | undefined, expireAt: Date }> {
        return new Promise((resolve, reject) => {
            jwt.sign({phoneOrEmail, role}, this.privateKeySecret, this.signInOptions, (err: Error | null,  encoded: string | undefined) => {
                if(err === null && encoded !== undefined) {
                    // tte = time to expire; which rughly in two weeks
                   const tte = 2 * 604800; 
                   const expireAt = new Date();
                   expireAt.setSeconds(expireAt.getSeconds()+tte);
                   resolve({token: encoded, expireAt});
                }
                else {
                    reject(err);
                }
            })
        })
    }

    verifyToken(token: string): Promise<JwtPayload & {phoneOrEmail: string | undefined; role: 'USER' | 'ADMIN';} | null> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.publicKey, this.verifyOptions, (err: VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
                if(err === null && decoded !== undefined) {
                    const d = decoded as JwtPayload & {
                        phoneOrEmail: string | undefined;
                        role: 'USER' | 'ADMIN';
                    };
                    if(d.phoneOrEmail) {
                        resolve({phoneOrEmail: d.phoneOrEmail, role: d.role})
                        return
                    }
                }
                resolve(null)
            })

        })    
    }

}

export default JWTService;