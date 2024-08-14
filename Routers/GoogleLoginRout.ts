import express from "express";
import GoogleLoginController from "../Controller/GoogleLoginController";
const GoogleRouter = express.Router();

GoogleRouter.post('/google_login', GoogleLoginController.googleLogin);
export default GoogleRouter;