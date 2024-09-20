import { CategoryRepository } from '../scr/repositories/CategoryRepository.js';
import Category from '../scr/models/Category.js';

jest.mock('../scr/models/Category.js');


describe('CategoryRepository', () => {
    let categoryRepository;

    beforeEach(() => {
        categoryRepository = new CategoryRepository();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getCategories', () => {
        it('should return categories', async () => {
            const mockCategories = [{ id: 1, name: 'Category 1' }];
            Category.findAll.mockResolvedValue(mockCategories);

            const result = await categoryRepository.getCategories();

            expect(result).toEqual(mockCategories);
            expect(Category.findAll).toHaveBeenCalled();
        });
    });

    describe('addCategory', () => {
        it('should add a category', async () => {
            const mockCategory = { id: 1, name: 'Category 1' };
            Category.create.mockResolvedValue(mockCategory);

            const result = await categoryRepository.addCategory({ name: 'Category 1' });

            expect(result).toEqual(mockCategory);
            expect(Category.create).toHaveBeenCalledWith({ name: 'Category 1' });
        });
    });
});
