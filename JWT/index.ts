import { Response, NextFunction } from 'express'; // Import the types from Express
import jwt from 'jsonwebtoken';
import ServerResponseHandler from '../ServerResponse/ServerRisponse';
import {ENV} from '../dotenv'

const response = new ServerResponseHandler();

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

// Verify a JWT token
const verifyToken = (req: any, res: Response, next: NextFunction): void => {
    const token = req.header('token');
    // console.log(token)
    if (!token) {
        response.unAuthorized(res, 'Access denied. Token is missing.');
    }
    try {
        const decoded = jwt.verify(token, ENV.JWT_SECRET); // Replace with your secret key
        req.user = decoded as User;
        next();
    } catch (error) {
        response.unAuthorized(res, 'Access denied. Invalid token.');
    }
};

export { generateToken, verifyToken };
