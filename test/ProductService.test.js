import { ProductService } from '../scr/services/ProductService.js';
import { ProductRepository } from '../scr/repositories/ProductRepository.js';

jest.mock('../scr/repositories/ProductRepository.js');

describe('ProductService', () => {
    let productService;

    beforeEach(() => {
        productService = new ProductService();
    });

    describe('getAll', () => {
        it('should return all products', async () => {
            const mockProducts = [{ id: 1, productName: 'Product 1' }];
            ProductRepository.prototype.getAll.mockResolvedValue(mockProducts);

            const result = await productService.getAll();

            expect(result).toEqual(mockProducts);
            expect(ProductRepository.prototype.getAll).toHaveBeenCalled();
        });

        it('should return undefined when no products are found', async () => {
            ProductRepository.prototype.getAll.mockResolvedValue(null);

            const result = await productService.getAll();

            expect(result).toBeUndefined();
        });
    });

    describe('getProduct', () => {
        it('should return a product when found', async () => {
            const mockProduct = { id: 1, productName: 'Product 1' };
            ProductRepository.prototype.getProduct.mockResolvedValue(mockProduct);

            const result = await productService.getProduct(1);

            expect(result).toEqual(mockProduct);
            expect(ProductRepository.prototype.getProduct).toHaveBeenCalledWith(1);
        });

        it('should return undefined when product is not found', async () => {
            ProductRepository.prototype.getProduct.mockResolvedValue(null);

            const result = await productService.getProduct(1);

            expect(result).toBeUndefined();
        });
    });

    describe('addProduct', () => {
        it('should return added product data', async () => {
            const mockProduct = { id: 1, productName: 'New Product' };
            ProductRepository.prototype.addProduct.mockResolvedValue(mockProduct);

            const result = await productService.addProduct({ productName: 'New Product' });

            expect(result).toEqual({});
            expect(ProductRepository.prototype.addProduct).toHaveBeenCalledWith({ productName: 'New Product' });
        });

        it('should return undefined when adding fails', async () => {
            ProductRepository.prototype.addProduct.mockResolvedValue(null);

            const result = await productService.addProduct({ productName: 'New Product' });

            expect(result).toBeUndefined();
        });
    });

    describe('updateProduct', () => {
        it('should return updated product data', async () => {
            const mockProduct = { id: 1, productName: 'Updated Product' };
            ProductRepository.prototype.updateProduct.mockResolvedValue(mockProduct);

            const result = await productService.updateProduct(1, { productName: 'Updated Product' });

            expect(result).toEqual({});
            expect(ProductRepository.prototype.updateProduct).toHaveBeenCalledWith(1, { productName: 'Updated Product' });
        });

        it('should return undefined when updating fails', async () => {
            ProductRepository.prototype.updateProduct.mockResolvedValue(null);

            const result = await productService.updateProduct(1, { productName: 'Updated Product' });

            expect(result).toBeUndefined();
        });
    });
});
