import express from "express";
const AccountRout = express.Router();
import AccountController from "../Controller/AccountController";

AccountRout.post('/createAccount', AccountController.createAccount);

export default AccountRout;