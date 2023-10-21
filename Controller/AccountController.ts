import  {AccountModel}  from "../Models/index";
import ServerResponseClass from "../ServerResponse/ServerRisponse";
const response = new ServerResponseClass();


export default {
    createAccount: async (req: any, res: any) => {
        try {
            req.body['created_by'] = req.user.userId;
            const newAccount = await AccountModel.create(req.body);
            response.handleSuccess(res, newAccount, 'Account Created.')
        } catch (error) {
            console.error(error);
            response.somethingWentWrong(res);
        }
    },


}