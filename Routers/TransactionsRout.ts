import express from "express";
const TransactionsRout = express.Router();
import TransactionsController from "../Controller/TransactionsController";

TransactionsRout.post('/addTransaction', TransactionsController.createTransactions);
TransactionsRout.get('/getTransaction', TransactionsController.getTransactions);
TransactionsRout.get('/getTransactionsForDashboard', TransactionsController.getTransactionsForDashboard);
TransactionsRout.delete('/deleteTransaction', TransactionsController.deleteTransactions);
TransactionsRout.put('/editTransactions', TransactionsController.editTransactions);
TransactionsRout.get('/getTransactionsForEdit', TransactionsController.getTransactionsForEdit);
TransactionsRout.get('/getBarGraphData', TransactionsController.getBarGraphData);
TransactionsRout.get('/getLineGraphData', TransactionsController.getLineGraphData);
TransactionsRout.get('/getExpenseData', TransactionsController.getExpenseData);
TransactionsRout.get('/getIncomeData', TransactionsController.getIncomeData);
TransactionsRout.get('/getBalanceByPaymentMethod', TransactionsController.getBalanceByPaymentMethod);


export default TransactionsRout;