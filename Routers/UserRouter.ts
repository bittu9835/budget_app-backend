import express from "express";
const UserRouter = express.Router();
import UserController from "../Controller/UserController";
UserRouter.post('/addUser', UserController.createUser);
export default UserRouter;