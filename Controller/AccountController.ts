import { AccountModel,TransactionsModel } from "../Models/index";
import ServerResponseClass from "../ServerResponse/ServerRisponse";
const response = new ServerResponseClass();


export default {
    createAccount: async (req: any, res: any) => {
        try {
            req.body['created_by'] = req.user.userId;
            const accountCardNumber = req.body.accountCardNumber;
            const account = await AccountModel.findOne({ accountCardNumber })
            if (account) {
                response.badRequest(res, 'Account Already Exist')
            } else {
                const newAccount = await AccountModel.create(req.body);
                response.handleSuccess(res, newAccount, 'Account Added.')
            }
        } catch (error) {
            console.error(error);
            response.somethingWentWrong(res);
        }
    },
    gatAccountCard: async (req: any, res: any) => {
        try {
            const newAccount = await AccountModel.find({ created_by: req.user.userId, isActive: true });
            response.handleSuccess(res, newAccount, 'AccountCard Details fetch.')
        } catch (error) {
            console.error(error);
            response.somethingWentWrong(res);
        }
    },

    gatOneAccountCard: async (req: any, res: any) => {
        try {
            const newAccount = await AccountModel.findOne({ _id: req.query._id }, { _id: 1, type: 1, accountCardNumber: 1, bankCardName: 1, bankLocation: 1, ifcCode: 1, name:1, expairyDate: 1, serviveProvider: 1, created_at: 1, isActive: 1 });
            response.handleSuccess(res, newAccount, 'OneAccountCard Details fetch.')
        } catch (error) {
            console.error(error);
            response.somethingWentWrong(res);
        }
    },

    editAccountCard: async (req: any, res: any) => {
        try {
            const Account = await AccountModel.findByIdAndUpdate({ _id: req.body._id }, req.body);
            response.handleSuccess(res, Account, 'Account&Card Updated');
        } catch (error) {
            console.error(error);
            response.somethingWentWrong(res);
        }
    },

    deleteAccountCard: async (req: any, res: any) => {
        try {
            const Account = await AccountModel.deleteOne({ _id: req.body._id });
            response.handleSuccess(res, Account, 'Account&Card Deleted');
        } catch (error) {
            console.error(error);
            response.somethingWentWrong(res);
        }
    },

    gatAccount: async (req: any, res: any) => {
        try {
            const newAccount = await AccountModel.find({ created_by: req.user.userId, isActive: true, type: 'bank' });
            response.handleSuccess(res, newAccount, 'Account Details fetch.')
        } catch (error) {
            console.error(error);
            response.somethingWentWrong(res);
        }
    },

    gatCard: async (req: any, res: any) => {
        try {
            const newAccount = await AccountModel.find({ created_by: req.user.userId, isActive: true, type: 'card' });
            response.handleSuccess(res, newAccount, 'Card Details fetch.')
        } catch (error) {
            console.error(error);
            response.somethingWentWrong(res);
        }
    },


}