import  {CategoryModel}  from "../Models/index";
import ServerResponseClass from "../ServerResponse/ServerRisponse";
const response = new ServerResponseClass();


export default {
    createCategory: async (req: any, res: any) => {
        try {
            const newCategory = await CategoryModel.create(req.body);
            response.handleSuccess(res, newCategory, 'Category Created.')
        } catch (error) {
            console.error(error);
            response.somethingWentWrong(res);
        }
    },
    getIncomeCategory: async (req: any, res: any) => {
        try {
            const newCategory = await CategoryModel.find({action:'income'});
            response.handleSuccess(res, newCategory, 'Category Featch successfull.')
        } catch (error) {
            console.error(error);
            response.somethingWentWrong(res);
        }
    },
    getExpenceCategory: async (req: any, res: any) => {
        try {
            const newCategory = await CategoryModel.find({action:'expence'});
            response.handleSuccess(res, newCategory, 'Category Featch successfull.')
        } catch (error) {
            console.error(error);
            response.somethingWentWrong(res);
        }
    },
}