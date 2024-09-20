import { ProductRepository } from '../scr/repositories/ProductRepository.js';
import Category from '../scr/models/Category.js';
import Product from '../scr/models/Product.js';

jest.mock('../scr/models/Product.js');

describe('ProductRepository', () => {
    let productRepository;

    beforeEach(() => {
        productRepository = new ProductRepository();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAll', () => {
        it('should return all products with categories', async () => {
            const mockProducts = [{ id: 1, productName: 'Product 1' }];
            Product.findAll.mockResolvedValue(mockProducts);

            const result = await productRepository.getAll();

            expect(result).toEqual(mockProducts);
            expect(Product.findAll).toHaveBeenCalledWith({ include: Category, limit: 10 });
        });
    });

    describe('getProduct', () => {
        it('should return a product by id', async () => {
            const mockProduct = { id: 1, productName: 'Product 1' };
            Product.findByPk.mockResolvedValue(mockProduct);
            const id = 1;

            const result = await productRepository.getProduct(id);

            expect(result).toEqual(mockProduct);
            expect(Product.findByPk).toHaveBeenCalledWith(id, { include: Category });
        });
    });

    describe('addProduct', () => {
        it('should add a new product', async () => {
            const mockProduct = { id: 1, productName: 'Product 1' };
            Product.create.mockResolvedValue(mockProduct);

            const result = await productRepository.addProduct({ productName: 'Product 1' });

            expect(result).toEqual(mockProduct);
            expect(Product.create).toHaveBeenCalledWith({ productName: 'Product 1' });
        });
    });

    describe('updateProduct', () => {
        it('should update a product by id', async () => {
            const id = 1;
            const data = { productName: 'Updated Product' };
            Product.update.mockResolvedValue([1]);

            const result = await productRepository.updateProduct(id, data);

            expect(result).toEqual([1]);
            expect(Product.update).toHaveBeenCalledWith(data, { where: { id } });
        });
    });
});
