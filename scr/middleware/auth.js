import jwt from 'jsonwebtoken';
import { BADREQUEST, UNAUTHORIZED } from '../utils/statusCodes.js';
import Response from '../models/response.js';

const seed = process.env.JWT_SEED;
const expired = process.env.LOGIN_TIMEOUT;

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) return res.status(UNAUTHORIZED).json(new Response({ success: false, message: 'ACCESO DENEGADO' }));

    try {
        const userValidated = jwt.verify(token, seed);

        req.user = userValidated;
        next();
    } catch (error) {
        res.status(BADREQUEST).json(new Response({ success: false, message: 'TOKEN INCORRECTO' }));
    }
};

export const generateToken = (user) => {
    return jwt.sign(user, seed, { expiresIn: expired });
}

export default authMiddleware;