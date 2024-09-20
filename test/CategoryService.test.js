import { CategoryService } from '../scr/services/CategoryService.js';
import { CategoryRepository } from '../scr/repositories/CategoryRepository.js';

jest.mock('../scr/repositories/CategoryRepository.js');

describe('CategoryService', () => {
    let categoryService;
    let mockCategories;

    beforeEach(() => {
        categoryService = new CategoryService();
        mockCategories = [{ id: 1, categoryName: 'Test Category' }];
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getCategories', () => {
        it('should return categories', async () => {
            CategoryRepository.prototype.getCategories.mockResolvedValue(mockCategories);

            const result = await categoryService.getCategories();

            expect(result).toEqual(mockCategories);
            expect(CategoryRepository.prototype.getCategories).toHaveBeenCalled();
        });
    });

    describe('addCategory', () => {
        it('should add a category and return its data', async () => {
            const mockCategory = { id: 2, categoryName: 'New Category', dataValues: { id: 2, categoryName: 'New Category' } };
            CategoryRepository.prototype.addCategory.mockResolvedValue(mockCategory);

            const result = await categoryService.addCategory({ categoryName: 'New Category' });

            expect(result).toEqual({ id: 2, categoryName: 'New Category' });
            expect(CategoryRepository.prototype.addCategory).toHaveBeenCalledWith({ categoryName: 'New Category' });
        });

        it('should return undefined if no response', async () => {
            CategoryRepository.prototype.addCategory.mockResolvedValue(null);

            const result = await categoryService.addCategory({ categoryName: 'New Category' });

            expect(result).toBeUndefined();
            expect(CategoryRepository.prototype.addCategory).toHaveBeenCalledWith({ categoryName: 'New Category' });
        });
    });
});
