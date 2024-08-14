import express from "express";
const Api = express();
import { verifyToken } from "./JWT";

// routes
import UserRouter from './Routers/UserRouter'
import AuthRouter from "./Routers/AuthRout";
import Transaction from "./Routers/TransactionsRout";
import Account from "./Routers/AccountRout";
import Category from "./Routers/CategoryRout";
import GoogleRouter from "./Routers/GoogleLoginRout";
// login
Api.use('/auth', AuthRouter);
Api.use('/user', UserRouter);
Api.use('/google', GoogleRouter);
// other crud
Api.use(verifyToken)
Api.use('/transaction', Transaction);
Api.use('/account', Account);
Api.use('/category', Category);

export default Api;
