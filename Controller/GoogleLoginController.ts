import { OAuth2Client } from 'google-auth-library';
import { generateToken } from "../JWT"; // Import your generateToken function
import ServerResponseHandler from '../ServerResponse/ServerRisponse';
import { ENV } from '../dotenv';
import { UserModel } from "../Models/index"; // Assuming you have a User model for database interaction

const client = new OAuth2Client(ENV.GOOGLE_CLIENT_ID);
const response = new ServerResponseHandler();

export default {
    googleLogin: async (req: any, res: any) => {
        const { token } = req.body;
        console.log(token)
        try {
            // Verify the Google ID token
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: ENV.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            if (!payload) {
                return response.unAuthorized(res, 'Invalid Google token.');
            }

            const { sub, email, name } = payload;
            let user = await UserModel.findOne({ googleId: sub });

            if (!user) {
                // If the user doesn't exist, create a new one
                user = new UserModel({
                    googleId: sub,
                    email: email,
                    name: name,
                    password: sub
                });
                await user.save();
            }

            // Generate a JWT token
            const jwtToken = generateToken({
                _id: user._id,
                name: user.name,
                email: user.email,
            });

            // Send the token to the client
            response.handleSuccess(res, { user, jwtToken }, 'User LoggedIn.');
        } catch (error) {
            console.error('Error during Google login:', error);
            return response.somethingWentWrong(res, 'Google login failed.');
        }
    }
}

