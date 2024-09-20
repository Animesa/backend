import Response from "../src/models/response.js";
import { MovementService } from "../src/services/MovementService.js";
import { getInventory, getMovement, addMovement, addMassive } from '../src/controller/MovementController.js';
import { NOTFOUND, OK, CREATED, INTERNALSERVERERROR, BAD_REQUEST, BADREQUEST } from '../src/utils/statusCodes.js';

jest.mock('../src/services/MovementService.js');

describe('Movement Controller', () => {
    let req, res;

    beforeEach(() => {
        req = { params: {}, body: {}, user: { id: 1 } };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    describe('getInventory', () => {
        it('should return inventory data for a product', async () => {
            const productId = 1;
            req.params.productId = productId;
            const mockResponse = [{ /* mock your inventory data here */ }];
            MovementService.prototype.getInventory.mockResolvedValue(mockResponse);

            await getInventory(req, res);
            expect(res.status).toHaveBeenCalledWith(OK);
            expect(res.json).toHaveBeenCalledWith(new Response({ data: mockResponse }));
        });

        it('should return NOT FOUND if no inventory data', async () => {
            req.params.productId = 1;
            MovementService.prototype.getInventory.mockResolvedValue(null);

            await getInventory(req, res);
            expect(res.status).toHaveBeenCalledWith(NOTFOUND);
            expect(res.json).toHaveBeenCalledWith(new Response({ data: null }));
        });

        it('should return INTERNAL SERVER ERROR on service error', async () => {
            req.params.productId = 1;
            MovementService.prototype.getInventory.mockRejectedValue(new Error('Error'));

            await getInventory(req, res);
            expect(res.status).toHaveBeenCalledWith(INTERNALSERVERERROR);
            expect(res.json).toHaveBeenCalledWith(new Response({ success: false, message: 'Se presentó un error al procesar la solicitud', errors: expect.any(Error) }));
        });
    });

    describe('getMovement', () => {
        it('should return movement data for a product', async () => {
            const productId = 1;
            req.params.productId = productId;
            const mockResponse = [{ /* mock your movement data here */ }];
            MovementService.prototype.getMovement.mockResolvedValue(mockResponse);

            await getMovement(req, res);
            expect(res.status).toHaveBeenCalledWith(OK);
            expect(res.json).toHaveBeenCalledWith(new Response({ data: mockResponse }));
        });

        it('should return NOT FOUND if no movement data', async () => {
            req.params.productId = 1;
            MovementService.prototype.getMovement.mockResolvedValue(null);

            await getMovement(req, res);
            expect(res.status).toHaveBeenCalledWith(NOTFOUND);
            expect(res.json).toHaveBeenCalledWith(new Response({ data: null }));
        });

        it('should return INTERNAL SERVER ERROR on service error', async () => {
            req.params.productId = 1;
            MovementService.prototype.getMovement.mockRejectedValue(new Error('Error'));

            await getMovement(req, res);
            expect(res.status).toHaveBeenCalledWith(INTERNALSERVERERROR);
            expect(res.json).toHaveBeenCalledWith(new Response({ success: false, message: 'Se presentó un error al procesar la solicitud', errors: expect.any(Error) }));
        });
    });

    describe('addMovement', () => {
        it('should add a movement and return CREATED', async () => {
            const mockMovementData = { concept: 'Sale', inputs: 10, outputs: 0 };
            req.body = mockMovementData;
            const mockResponse = { id: 1, ...mockMovementData };
            MovementService.prototype.addMovement.mockResolvedValue(mockResponse);

            await addMovement(req, res);
            expect(res.status).toHaveBeenCalledWith(CREATED);
            expect(res.json).toHaveBeenCalledWith(new Response({ data: mockResponse }));
        });

        it('should return NOT FOUND if movement not added', async () => {
            const mockMovementData = { concept: 'Sale', inputs: 10, outputs: 0 };
            req.body = mockMovementData;
            MovementService.prototype.addMovement.mockResolvedValue(null);

            await addMovement(req, res);
            expect(res.status).toHaveBeenCalledWith(NOTFOUND);
            expect(res.json).toHaveBeenCalledWith(new Response({ data: null }));
        });

        it('should return INTERNAL SERVER ERROR on service error', async () => {
            const mockMovementData = { concept: 'Sale', inputs: 10, outputs: 0 };
            req.body = mockMovementData;
            MovementService.prototype.addMovement.mockRejectedValue(new Error('Error'));

            await addMovement(req, res);
            expect(res.status).toHaveBeenCalledWith(INTERNALSERVERERROR);
            expect(res.json).toHaveBeenCalledWith(new Response({ success: false, message: 'Se presentó un error al procesar la solicitud', errors: expect.any(Error) }));
        });
    });

    describe('addMassive', () => {
        it('should add multiple movements and return CREATED', async () => {
            const mockMassiveData = [{ concept: 'Sale', inputs: 10, outputs: 0 }];
            req.body = mockMassiveData;
            const mockResponse = [{ id: 1, ...mockMassiveData[0] }];
            MovementService.prototype.addMassive.mockResolvedValue(mockResponse);

            await addMassive(req, res);
            expect(res.status).toHaveBeenCalledWith(CREATED);
            expect(res.json).toHaveBeenCalledWith(new Response({ data: mockResponse }));
        });

        it('should return BAD REQUEST if body is not an array', async () => {
            req.body = {};
            await addMassive(req, res);
            expect(res.status).toHaveBeenCalledWith(BADREQUEST);
            expect(res.json).toHaveBeenCalledWith(new Response({ success: false, message: 'El cuerpo de la solicitud debe ser un array.' }));
        });

        it('should return INTERNAL SERVER ERROR on service error', async () => {
            const mockMassiveData = [{ concept: 'Sale', inputs: 10, outputs: 0 }];
            req.body = mockMassiveData;
            MovementService.prototype.addMassive.mockRejectedValue(new Error('Error'));

            await addMassive(req, res);
            expect(res.status).toHaveBeenCalledWith(INTERNALSERVERERROR);
            expect(res.json).toHaveBeenCalledWith(new Response({ success: false, message: 'Se presentó un error al procesar la solicitud', errors: expect.any(Error) }));
        });
    });
});
