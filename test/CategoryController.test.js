import { getCategories, addCategory } from '../scr/controller/CategoryController.js';
import { CategoryService } from '../scr/services/CategoryService.js';
import Response from '../scr/models/response.js';
import { OK, NOTFOUND, INTERNALSERVERERROR } from '../scr/utils/statusCodes.js';

jest.mock('../scr/services/CategoryService.js');

describe('CategoryController', () => {
    let req, res;
    const mockSend = jest.fn();
    const mockStatus = jest.fn(() => ({ json: mockSend }));

    beforeEach(() => {
        req = { body: {} };
        res = { status: mockStatus };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getCategories', () => {
        it('should return categories with status 200', async () => {
            const mockCategories = [{ id: 1, name: 'Category 1' }];
            CategoryService.prototype.getCategories.mockResolvedValue(mockCategories);

            await getCategories(req, res);

            expect(mockStatus).toHaveBeenCalledWith(OK);
            expect(mockSend).toHaveBeenCalledWith(new Response({ data: mockCategories }));
        });
    });

    describe('addCategory', () => {
        it('should return added category with status 200', async () => {
            req.body = { name: 'New Category' };
            const mockResponse = { id: 2, name: 'New Category' };
            CategoryService.prototype.addCategory.mockResolvedValue(mockResponse);

            await addCategory(req, res);

            expect(mockStatus).toHaveBeenCalledWith(OK);
            expect(mockSend).toHaveBeenCalledWith(new Response({ data: mockResponse }));
        });

        it('should return 404 if category not found', async () => {
            req.body = { name: 'New Category' };
            CategoryService.prototype.addCategory.mockResolvedValue(null);

            await addCategory(req, res);

            expect(mockStatus).toHaveBeenCalledWith(NOTFOUND);
            expect(mockSend).toHaveBeenCalledWith(new Response({ data: null }));
        });

        it('should return 500 on error', async () => {
            req.body = { name: 'New Category' };
            const mockError = new Error('Database error');
            CategoryService.prototype.addCategory.mockRejectedValue(mockError);

            await addCategory(req, res);

            expect(mockStatus).toHaveBeenCalledWith(INTERNALSERVERERROR);
            expect(mockSend).toHaveBeenCalledWith(
                new Response({ success: false, message: 'Se presentó un error al procesar la solicitud', errors: mockError })
            );
        });
    });
});
