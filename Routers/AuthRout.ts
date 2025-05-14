import express from "express";
const AuthRouter = express.Router();
import Auth from "../Controller/Auth";
AuthRouter.post('/login', Auth.login);
AuthRouter.get('/ping',Auth.ping)
export default AuthRouter;