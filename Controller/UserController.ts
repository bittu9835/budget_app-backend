import { UserModel } from "../Models/index";
import ServerResponseClass from "../ServerResponse/ServerRisponse";
import bcrypt from 'bcrypt'
const response = new ServerResponseClass();


export default {
    createUser: async (req: any, res: any) => {
        try {
            const { email, name, password } = req.body;
            const existingUser = await UserModel.findOne({ email});
            if (existingUser) {
                response.badRequest(res, 'Email Already Exist.');
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = await UserModel.create({ email, name, password: hashedPassword });
                response.handleSuccess(res, newUser, 'User Created Successfully.')
            }
        } catch (error) {
            console.error(error);
            response.somethingWentWrong(res);
        }
    },
   
    
}