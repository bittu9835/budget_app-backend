import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import ServerResponseHandler from '../ServerResponse/ServerRisponse';
import { ENV } from '../dotenv';

const response = new ServerResponseHandler();
// const client = new OAuth2Client(ENV.GOOGLE_CLIENT_ID); // Initialize Google OAuth2 client

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
    // const token = req.query.token;
    console.log('token/////////////////////', token);

    if (!token) {
        response.unAuthorized(res, 'Access denied. Token is missing.');
        return console.log('Access denied. Token is missing.');
    }

    try {
        const decoded = jwt.verify(token, ENV.JWT_SECRET);
        req.user = decoded as User;
        next();
    } catch (error) {
        response.unAuthorized(res, 'Access denied. Invalid token.');
        return console.log('Access denied. Invalid tokennnnnn');
    }
};


export { generateToken, verifyToken };
