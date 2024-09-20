import { getUser, addUser } from '../src/controller/UserController.js';
import { UserService } from '../src/services/UserService.js';
import Response from '../src/models/response.js';
import { INTERNALSERVERERROR, NOTFOUND, OK } from '../src/utils/statusCodes.js';

jest.mock('../src/services/UserService.js');

describe('UserController', () => {
    let req, res;

    beforeEach(() => {
        req = { body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getUser', () => {
        it('should return user successfully', async () => {
            req.body = { user: 'testUser', password: 'testPassword' };
            const mockData = { id: 1, user: 'testUser' };
            UserService.prototype.getUser.mockResolvedValue(mockData);

            await getUser(req, res);

            expect(res.status).toHaveBeenCalledWith(OK);
            expect(res.json).toHaveBeenCalledWith(new Response({ data: mockData }));
        });

        it('should handle error when user not found', async () => {
            req.body = { user: 'testUser', password: 'wrongPassword' };
            UserService.prototype.getUser.mockResolvedValue(null);

            await getUser(req, res);

            expect(res.status).toHaveBeenCalledWith(NOTFOUND);
            expect(res.json).toHaveBeenCalledWith(new Response({ data: null }));
        });

        it('should handle internal server error', async () => {
            req.body = { user: 'testUser', password: 'testPassword' };
            const errorMessage = 'Internal server error';
            UserService.prototype.getUser.mockRejectedValue(new Error(errorMessage));

            await getUser(req, res);

            expect(res.status).toHaveBeenCalledWith(INTERNALSERVERERROR);
            expect(res.json).toHaveBeenCalledWith(new Response({ success: false, message: 'Se presentó un error al procesar la solicitud', errors: expect.any(Error) }));
        });
    });

    describe('addUser', () => {
        it('should add a user successfully', async () => {
            req.body = { user: 'newUser', password: 'newPassword' };
            const mockData = { id: 1, user: 'newUser' };
            UserService.prototype.addUser.mockResolvedValue(mockData);

            await addUser(req, res);

            expect(res.status).toHaveBeenCalledWith(OK);
            expect(res.json).toHaveBeenCalledWith(new Response({ success: true, message: 'Solicitud procesada correctamente', data: mockData }));
        });

        it('should handle internal server error when adding user fails', async () => {
            req.body = { user: 'newUser', password: 'newPassword' };
            const errorMessage = 'Internal server error';
            UserService.prototype.addUser.mockRejectedValue(new Error(errorMessage));

            await addUser(req, res);

            expect(res.status).toHaveBeenCalledWith(INTERNALSERVERERROR);
            expect(res.json).toHaveBeenCalledWith(new Response({ success: false, message: 'Se presentó un error al procesar la solicitud', errors: expect.any(Error) }));
        });
    });
});
