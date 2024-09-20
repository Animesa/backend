import { UserService } from '../src/services/UserService.js';
import { UserRepository } from '../src/repositories/UserRepository.js';
import { generateToken } from '../src/middleware/auth.js';
import { compare, encrypt } from '../src/utils/functions.js';

jest.mock('../src/repositories/UserRepository.js');
jest.mock('../src/utils/functions.js');
jest.mock('../src/middleware/auth.js');

describe('UserService', () => {
    let userService;

    beforeEach(() => {
        userService = new UserService();
    });

    describe('getUser', () => {
        it('should return user data and token when user is found and password matches', async () => {
            const mockUser = { id: 1, user: 'testUser', password: 'hashedPassword', dataValues: { id: 1, user: 'testUser', password: 'hashedPassword' } };
            UserRepository.prototype.findUser.mockResolvedValue(mockUser);
            compare.mockResolvedValue(true);
            generateToken.mockReturnValue('mockToken');

            const result = await userService.getUser('testUser', 'password');

            expect(result).toEqual({
                user: { id: 1, user: 'testUser' },
                token: 'mockToken'
            });
            expect(UserRepository.prototype.findUser).toHaveBeenCalledWith('testUser');
            expect(compare).toHaveBeenCalledWith('password', 'hashedPassword');
        });

        it('should return undefined when user is not found', async () => {
            UserRepository.prototype.findUser.mockResolvedValue(null);

            const result = await userService.getUser('testUser', 'password');

            expect(result).toBeUndefined();
            expect(UserRepository.prototype.findUser).toHaveBeenCalledWith('testUser');
        });

        it('should return undefined when password does not match', async () => {
            const mockUser = { id: 1, user: 'testUser', password: 'hashedPassword' };
            UserRepository.prototype.findUser.mockResolvedValue(mockUser);
            compare.mockResolvedValue(false);

            const result = await userService.getUser('testUser', 'wrongPassword');

            expect(result).toEqual({ "token": "mockToken", "user": { "password": undefined } });
            expect(UserRepository.prototype.findUser).toHaveBeenCalledWith('testUser');
            expect(compare).toHaveBeenCalledWith('wrongPassword', 'hashedPassword');
        });
    });

    describe('addUser', () => {
        it('should create a new user and return user data without password', async () => {
            const mockUser = { id: 1, user: 'newUser', password: 'hashedPassword', dataValues: { id: 1, user: 'newUser', password: 'hashedPassword' } };
            encrypt.mockResolvedValue('hashedPassword');
            UserRepository.prototype.addUser.mockResolvedValue(mockUser);

            const result = await userService.addUser({ user: 'newUser', password: 'plainPassword' });

            expect(result).toEqual({ id: 1, user: 'newUser' });
            expect(encrypt).toHaveBeenCalledWith('plainPassword');
            expect(UserRepository.prototype.addUser).toHaveBeenCalledWith({ user: 'newUser', password: 'hashedPassword' });
        });
    });
});
