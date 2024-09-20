import { UserRepository } from '../src/repositories/UserRepository.js';
import Users from '../src/models/Users.js';

jest.mock('../src/models/Users.js');

describe('UserRepository', () => {
    let userRepository;

    beforeEach(() => {
        userRepository = new UserRepository();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('findUser', () => {
        it('should find a user by username', async () => {
            const mockUser = { id: 1, user: 'testUser' };
            Users.findOne.mockResolvedValue(mockUser);
            const username = 'testUser';

            const result = await userRepository.findUser(username);

            expect(result).toEqual(mockUser);
            expect(Users.findOne).toHaveBeenCalledWith({
                where: {
                    user: username
                }
            });
        });

        it('should return null if user is not found', async () => {
            Users.findOne.mockResolvedValue(null);
            const username = 'nonExistentUser';

            const result = await userRepository.findUser(username);

            expect(result).toBeNull();
            expect(Users.findOne).toHaveBeenCalledWith({
                where: {
                    user: username
                }
            });
        });
    });

    describe('addUser', () => {
        it('should add a new user', async () => {
            const mockUser = { id: 1, user: 'newUser' };
            Users.create.mockResolvedValue(mockUser);

            const result = await userRepository.addUser({ user: 'newUser' });

            expect(result).toEqual(mockUser);
            expect(Users.create).toHaveBeenCalledWith({ user: 'newUser' });
        });
    });
});