import { AccountModel } from "../Models/index";
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
            console.log(req.query)
            console.log('params',req.params)
            const newAccount = await AccountModel.findOne({ _id: req.query._id }, { _id: 1, balance: 1, type: 1, accountCardNumber: 1, bankCardName: 1, bankLocation: 1, ifcCode: 1, expairyDate: 1, serviveProvider: 1, created_at: 1, isActive: 1 });
            response.handleSuccess(res, newAccount, 'Account Details fetch.')
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