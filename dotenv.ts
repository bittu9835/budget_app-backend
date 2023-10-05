import * as dotenv from 'dotenv';
dotenv.config();
const {APP_PORT,DB_HOST,DB_NAME,JWT_SECRET}:any = process.env;

export const ENV = {...process.env, ...{APP_PORT,DB_HOST,DB_NAME,JWT_SECRET}}