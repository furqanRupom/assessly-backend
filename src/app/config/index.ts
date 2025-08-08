import dotenv from "dotenv"
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })
export default {
    node_env: process.env.NODE_ENV,
    port:process.env.PORT,
    database_url:process.env.DATABASE_URL,
    secret_access_token:process.env.SECRET_ACCESS_TOKEN,
    secret_refresh_token:process.env.SECRET_REFRESH_TOKEN,
    access_token_expires_in:process.env.ACCESS_TOKEN_EXPIRES_IN || '1d',
    refresh_token_expires_in:process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
    mail_host: process.env.MAIL_HOST || 'smtp.gmail.com',
    mail_port: process.env.MAIL_PORT || 2525,
    mail_user: process.env.MAIL_USER,
    mail_pass: process.env.MAIL_PASS,
}