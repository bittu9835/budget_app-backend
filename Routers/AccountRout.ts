import express from "express";
const AccountRout = express.Router();
import AccountController from "../Controller/AccountController";

AccountRout.post('/createAccount', AccountController.createAccount);
AccountRout.get('/gateAccountCard', AccountController.gatAccountCard);
AccountRout.put('/editAccountCard', AccountController.editAccountCard);
AccountRout.delete('/deleteAccountCard', AccountController.deleteAccountCard);
AccountRout.get('/gatOneAccountCard', AccountController.gatOneAccountCard);
AccountRout.get('/gatAccount', AccountController.gatAccount);
AccountRout.get('/gatCard', AccountController.gatCard);

export default AccountRout;