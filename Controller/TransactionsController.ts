import { CategoryModel, TransactionsModel } from "../Models/index";
import ServerResponseClass from "../ServerResponse/ServerRisponse";
const response = new ServerResponseClass();


export default {
    createTransactions: async (req: any, res: any) => {
        try {
            req.body['created_by'] = req.user.userId;
            const Category = await CategoryModel.findOne({ category: req.body.category });
            if (Category) {
                const newTransaction = await TransactionsModel.create(req.body);
                response.handleSuccess(res, newTransaction, 'Transaction Added.')
            } else {
                await CategoryModel.create({category:req.body.newCategory?.toUpperCase(),action:req.body.action});
                const newTransaction = await TransactionsModel.create(req.body);
                response.handleSuccess(res, newTransaction, 'Transaction Added.')
            }
        } catch (error) {
            console.error(error);
            response.somethingWentWrong(res);
        }
    },

    getTransactions: async (req: any, res: any) => {
        try {
            const Transaction = await TransactionsModel.find({ created_by: req.user.userId }).sort({ created_at: -1 });
            response.handleSuccess(res, Transaction, 'Transaction fetched Successfully');
        } catch (error) {
            console.error(error);
            response.somethingWentWrong(res);
        }
    },

    getTransactionsForEdit: async (req: any, res: any) => {
        try {
            const Transaction = await TransactionsModel.findOne({_id: req.query._id},{ _id: 1, amount: 1, action: 1, category:1, description:1,paymentMethod:1,from:1,date:1,});
            response.handleSuccess(res, Transaction, 'Transaction fetched ForEdit Successfully');
        } catch (error) {
            console.error(error);
            response.somethingWentWrong(res);
        }
    },

    editTransactions: async (req: any, res: any) => {
        try {
            const Transaction = await TransactionsModel.findByIdAndUpdate({_id:req.body._id}, req.body);
            response.handleSuccess(res, Transaction, 'Transaction Updated');
        } catch (error) {
            console.error(error);
            response.somethingWentWrong(res);
        }
    },

    deleteTransactions: async (req: any, res: any) => {
        try {
            const result = await TransactionsModel.deleteMany({ _id: req.body });
            if (result.deletedCount > 0) {
                response.handleSuccess(res, result, 'Deleted Successfully');
            } else {
                response.handleSuccess(res, null, 'No transactions found to delete');
            }
        } catch (error) {
            console.error(error);
            response.somethingWentWrong(res);
        }
    }


}