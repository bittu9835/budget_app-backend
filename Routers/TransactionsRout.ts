import express from "express";
const TransactionsRout = express.Router();
import TransactionsController from "../Controller/TransactionsController";

TransactionsRout.post('/addTransaction', TransactionsController.createTransactions);
TransactionsRout.get('/getTransaction', TransactionsController.getTransactions);
TransactionsRout.delete('/deleteTransaction', TransactionsController.deleteTransactions);


export default TransactionsRout;