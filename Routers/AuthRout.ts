import express from "express";
const AuthRouter = express.Router();
import Auth from "../Controller/Auth";
AuthRouter.post('/login', Auth.login);
export default AuthRouter;