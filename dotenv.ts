import * as dotenv from 'dotenv';
dotenv.config();
const { APP_PORT, DB_HOST, DB_NAME, JWT_SECRET, IP_ADDRESS, GOOGLE_CLIENT_ID }: any = process.env;

export const ENV = { ...process.env, ...{ APP_PORT, DB_HOST, IP_ADDRESS, DB_NAME, JWT_SECRET, GOOGLE_CLIENT_ID } }