import jwt from 'jsonwebtoken';
import authMiddleware, { generateToken } from '../scr/middleware/auth.js';
import Response from '../scr/models/response.js';
import { UNAUTHORIZED, BADREQUEST } from '../scr/utils/statusCodes.js';

jest.mock('jsonwebtoken');

describe('authMiddleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            header: jest.fn(),
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return UNAUTHORIZED if no token is provided', () => {
        req.header.mockReturnValue(null);

        authMiddleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(UNAUTHORIZED);
        expect(res.json).toHaveBeenCalledWith(new Response({ success: false, message: 'ACCESO DENEGADO' }));
        expect(next).not.toHaveBeenCalled();
    });

    it('should call next if token is valid', () => {
        const token = 'validToken';
        const user = { id: 1, name: 'Test User' };
        req.header.mockReturnValue(token);
        jwt.verify.mockReturnValue(user);

        authMiddleware(req, res, next);

        expect(req.user).toEqual(user);
        expect(next).toHaveBeenCalled();
    });

    it('should return BADREQUEST if token is invalid', () => {
        const token = 'invalidToken';
        req.header.mockReturnValue(token);
        jwt.verify.mockImplementation(() => { throw new Error(); });

        authMiddleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(BADREQUEST);
        expect(res.json).toHaveBeenCalledWith(new Response({ success: false, message: 'TOKEN INCORRECTO' }));
        expect(next).not.toHaveBeenCalled();
    });
});

describe('generateToken', () => {
    it('debería generar un token JWT correctamente', () => {
        const user = { id: 1, name: 'Test User' };
        const token = 'fakeToken';
        const seed = process.env.JWT_SEED;
        const expired = process.env.LOGIN_TIMEOUT;

        jwt.sign.mockReturnValue(token);

        const result = generateToken(user);

        expect(jwt.sign).toHaveBeenCalledWith(user, seed, { expiresIn: expired });
        expect(result).toBe(token);
    });
});