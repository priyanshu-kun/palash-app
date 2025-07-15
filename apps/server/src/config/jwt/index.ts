import { JWTKeysConfig } from "../../@types/interfaces.js";
import dotenv from "dotenv"

dotenv.config();

export const jwtKeysConfig: JWTKeysConfig = {
   secretKey: process.env.JWT_SECRET_KEY as string,
   accessTokenExpiry: '15m' as string,
   refreshTokenExpiry: '14d' as string 
}