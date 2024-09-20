import { getAll, getProduct, addProduct, updateProduct } from '../scr/controller/ProductController.js';
import { ProductService } from '../scr/services/ProductService.js';
import Response from '../scr/models/response.js';
import { BADREQUEST, CREATED, INTERNALSERVERERROR, NOTFOUND, OK } from '../scr/utils/statusCodes.js';

jest.mock('../scr/services/ProductService.js');

describe('ProductController', () => {
    let req, res;

    beforeEach(() => {
        req = { params: {}, body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAll', () => {
        it('should return all products successfully', async () => {
            const mockData = [{ id: 1, productName: 'Product 1' }];
            ProductService.prototype.getAll.mockResolvedValue(mockData);

            await getAll(req, res);

            expect(res.status).toHaveBeenCalledWith(OK);
            expect(res.json).toHaveBeenCalledWith(new Response({ data: mockData }));
        });

        it('should handle error when no products found', async () => {
            ProductService.prototype.getAll.mockResolvedValue(null);

            await getAll(req, res);

            expect(res.status).toHaveBeenCalledWith(NOTFOUND);
            expect(res.json).toHaveBeenCalledWith(new Response({ data: null }));
        });

        it('should handle internal server error', async () => {
            const errorMessage = 'Internal server error';
            ProductService.prototype.getAll.mockRejectedValue(new Error(errorMessage));

            await getAll(req, res);

            expect(res.status).toHaveBeenCalledWith(INTERNALSERVERERROR);
            expect(res.json).toHaveBeenCalledWith(new Response({ success: false, message: 'Se presentó un error al procesar la solicitud', errors: expect.any(Error) }));
        });
    });

    describe('getProduct', () => {
        it('should return a product successfully', async () => {
            req.params.id = 1;
            const mockData = { id: 1, productName: 'Product 1' };
            ProductService.prototype.getProduct.mockResolvedValue(mockData);

            await getProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(OK);
            expect(res.json).toHaveBeenCalledWith(new Response({ data: mockData }));
        });

        it('should handle error when product not found', async () => {
            req.params.id = 1;
            ProductService.prototype.getProduct.mockResolvedValue(null);

            await getProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(NOTFOUND);
            expect(res.json).toHaveBeenCalledWith(new Response({ data: null }));
        });

        it('should handle internal server error', async () => {
            req.params.id = 1;
            const errorMessage = 'Internal server error';
            ProductService.prototype.getProduct.mockRejectedValue(new Error(errorMessage));

            await getProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(INTERNALSERVERERROR);
            expect(res.json).toHaveBeenCalledWith(new Response({ success: false, message: 'Se presentó un error al procesar la solicitud', errors: expect.any(Error) }));
        });
    });

    describe('addProduct', () => {
        it('should add a product successfully', async () => {
            req.body = { productName: 'New Product' };
            const mockData = { id: 1, productName: 'New Product' };
            ProductService.prototype.addProduct.mockResolvedValue(mockData);

            await addProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(CREATED);
            expect(res.json).toHaveBeenCalledWith(new Response({ data: mockData }));
        });

        it('should handle error when adding a product fails', async () => {
            req.body = { productName: 'New Product' };
            ProductService.prototype.addProduct.mockResolvedValue(null);

            await addProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(NOTFOUND);
            expect(res.json).toHaveBeenCalledWith(new Response({ data: null }));
        });

        it('should handle internal server error', async () => {
            req.body = { productName: 'New Product' };
            const errorMessage = 'Internal server error';
            ProductService.prototype.addProduct.mockRejectedValue(new Error(errorMessage));

            await addProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(INTERNALSERVERERROR);
            expect(res.json).toHaveBeenCalledWith(new Response({ success: false, message: 'Se presentó un error al procesar la solicitud', errors: expect.any(Error) }));
        });
    });

    describe('updateProduct', () => {
        it('should update a product successfully', async () => {
            req.params.id = 1;
            req.body = { productName: 'Updated Product' };
            ProductService.prototype.updateProduct.mockResolvedValue(undefined);

            await updateProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(OK);
            expect(res.json).toHaveBeenCalledWith(new Response({ data: undefined }));
        });

        it('should handle internal server error during update', async () => {
            req.params.id = 1;
            req.body = { productName: 'Updated Product' };
            const errorMessage = 'Internal server error';
            ProductService.prototype.updateProduct.mockRejectedValue(new Error(errorMessage));

            await updateProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(INTERNALSERVERERROR);
            expect(res.json).toHaveBeenCalledWith(new Response({ success: false, message: 'Se presentó un error al procesar la solicitud', errors: expect.any(Error) }));
        });
    });
});
