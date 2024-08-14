import { UserModel } from "../Models/index";
import bcrypt from 'bcrypt'
import { generateToken } from "../JWT";
import ServerResponseClass from "../ServerResponse/ServerRisponse";
const response = new ServerResponseClass();


export default {
    login: async (req: any, res: any) => {
        const { email, password } = req.body;
        try {
            const User = await UserModel.findOne({ email });
            if (!User) {
                response.handleNotFound(res, 'Incorrect Email.');
            } else {
                const passwordMatch = await bcrypt.compare(password, User.password);
                if (!passwordMatch) {
                    response.unAuthorized(res, 'Password Incorrect.');
                } else {
                    const jwtToken = generateToken(User);
                    const userDetail = await UserModel.findOne(
                        { _id: User._id },
                        { _id: 1, name: 1, email: 1, profileImage: 1 }
                    )
                    response.handleSuccess(res, { userDetail, jwtToken }, 'User LoggedIn.');
                }
            }
        } catch (error) {
            console.log("Exception", error);
            return response.somethingWentWrong(res);
        }
    },
}