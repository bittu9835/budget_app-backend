import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import ServerResponseHandler from '../ServerResponse/ServerRisponse';
import { ENV } from '../dotenv';

const response = new ServerResponseHandler();
const client = new OAuth2Client(ENV.GOOGLE_CLIENT_ID); // Initialize Google OAuth2 client

// Define the user object type
interface User {
    _id: string;
    name: string;
    email: string;
}

// Generate a JWT token
const generateToken = (user: User): string => {
    const payload = {
        userId: user._id,
        username: user.name,
        email: user.email,
    };
    const options = {
        // expiresIn: '1h', // Token expiration time (optional)
    };
    return jwt.sign(payload, ENV.JWT_SECRET, options);
};

// Verify a JWT token or Google ID token
const verifyToken = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    const token = req.header('token');

    if (!token) {
        response.unAuthorized(res, 'Access denied. Token is missing.');
    }

    try {
        let decoded: any;

        if (token.startsWith('ya29.') || token.split('.').length === 3) { // Simple checks for Google ID token format
            // Verify Google ID token
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: ENV.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();

            if (payload) {
                decoded = {
                    _id: payload.sub, // Google user ID
                    name: payload.name,
                    email: payload.email,
                };
            } else {
                throw new Error('Invalid Google token');
            }
        } else {
            // Verify your JWT token
            decoded = jwt.verify(token, ENV.JWT_SECRET) as User;
        }

        req.user = decoded;
        next();
    } catch (error) {
        response.unAuthorized(res, 'Access denied. Invalid token.');
    }
};

export { generateToken, verifyToken };
