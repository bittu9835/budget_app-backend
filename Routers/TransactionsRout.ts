import express from "express";
const TransactionsRout = express.Router();
import TransactionsController from "../Controller/TransactionsController";

TransactionsRout.post('/addTransaction', TransactionsController.createTransactions);
TransactionsRout.get('/getTransaction', TransactionsController.getTransactions);
TransactionsRout.get('/getEarning', TransactionsController.getEarning);
TransactionsRout.get('/getExpense', TransactionsController.getExpense);


export default TransactionsRout;