import express from "express";
const Api = express();
import { verifyToken } from "./JWT";

// routes
import UserRouter from './Routers/UserRouter'
import AuthRouter from "./Routers/AuthRout";
// login
Api.use('/auth', AuthRouter);
// Api.use(verifyToken)
// other crud
Api.use('/user', UserRouter);

export default Api;
