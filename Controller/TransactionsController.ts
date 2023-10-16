import { TransactionsModel } from "../Models/index";
import ServerResponseClass from "../ServerResponse/ServerRisponse";
const response = new ServerResponseClass();


export default {
    createTransactions: async (req: any, res: any) => {
        try {
            req.body['created_by'] = req.user.userId;
            const newTransaction = await TransactionsModel.create(req.body);
            response.handleSuccess(res, newTransaction, 'Transaction Created Successfully.')
        } catch (error) {
            console.error(error);
            response.somethingWentWrong(res);
        }
    },

    getTransactions: async (req: any, res: any) => {
        try {
            const Transaction = await TransactionsModel.find({created_by: req.user.userId});
            response.handleSuccess(res, Transaction, 'Transaction fetched Successfully');
        } catch (error) {
            console.error(error);
            response.somethingWentWrong(res);
        }
    },

    getEarning: async (req: any, res: any) => {
        try {
            const Earning = await TransactionsModel.find({created_by: req.user.userId, DrCr:"earning"});
            console.log(Earning)
            response.handleSuccess(res, Earning, 'Earning fetched Successfully');
        } catch (error) {
            console.error(error);
            response.somethingWentWrong(res);
        }
    },

    getExpense: async (req: any, res: any) => {
        try {
            const Expense = await TransactionsModel.find({created_by: req.user.userId, DrCr:"expense"});
            console.log(Expense)
            response.handleSuccess(res, Expense, 'Expense fetched Successfully');
        } catch (error) {
            console.error(error);
            response.somethingWentWrong(res);
        }
    }

}