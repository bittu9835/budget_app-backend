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

}