import { JWTKeysConfig } from "../../@types/interfaces.js";
import { __dirname } from "../../utils/__dirname-handler.js";
import path, {join} from "path";
import dotenv from "dotenv"

dotenv.config();

export const jwtKeysConfig: JWTKeysConfig = {
   privateKeyFile: join(__dirname, process.env.PRIVATE_KEY_FILE as string),
   privateKeyPassphrase: process.env.PRIVATE_KEY_PASSPHRASE as string,
   publicKeyFile: join(__dirname, process.env.PUBLIC_KEY_FILE as string)
}