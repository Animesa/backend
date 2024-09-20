import bcrypt from 'bcryptjs';
import { encrypt, compare, validateFormatter } from '../src/utils/functions.js';

jest.mock('bcryptjs');

describe('authUtils', () => {
    describe('encrypt', () => {
        it('should encrypt a plain text', async () => {
            const plainText = 'myPassword';
            const hashedText = 'hashedPassword';
            bcrypt.hash.mockResolvedValue(hashedText);

            const result = await encrypt(plainText);

            expect(result).toBe(hashedText);
            expect(bcrypt.hash).toHaveBeenCalledWith(plainText, 5);
        });
    });

    describe('compare', () => {
        it('should compare plain password with encrypted password', async () => {
            const plainPassword = 'myPassword';
            const encryptedPassword = 'hashedPassword';
            bcrypt.compare.mockResolvedValue(true);

            const result = await compare(plainPassword, encryptedPassword);

            expect(result).toBe(true);
            expect(bcrypt.compare).toHaveBeenCalledWith(plainPassword, encryptedPassword);
        });
    });

    describe('validateFormatter', () => {
        it('should format validation messages correctly', () => {
            const input = { path: 'email', msg: 'is required' };
            const result = validateFormatter(input);

            expect(result).toBe('email: is required');
        });
    });
});
