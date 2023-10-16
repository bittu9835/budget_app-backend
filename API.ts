import express from "express";
const Api = express();
import { verifyToken } from "./JWT";

// routes
import UserRouter from './Routers/UserRouter'
import AuthRouter from "./Routers/AuthRout";
import Transaction from "./Routers/TransactionsRout";
// login
Api.use('/auth', AuthRouter);
Api.use('/user', UserRouter);
// other crud
Api.use(verifyToken)
Api.use('/transaction', Transaction);

export default Api;
