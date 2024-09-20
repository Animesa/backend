import { MovementService } from '../scr/services/MovementService.js';
import { MovementRepository } from '../scr/repositories/MovementRepository.js';

jest.mock('../scr/repositories/MovementRepository.js');

describe('MovementService', () => {
    let movementService;

    beforeEach(() => {
        movementService = new MovementService();
    });

    describe('getInventory', () => {
        it('should return inventory data when found', async () => {
            const mockData = [{ id: 1, totalInputs: 10, totalOutputs: 5 }];
            MovementRepository.prototype.getInventory.mockResolvedValue(mockData);

            const result = await movementService.getInventory(1);

            expect(result).toEqual(mockData);
            expect(MovementRepository.prototype.getInventory).toHaveBeenCalledWith(1);
        });

        it('should return undefined when no data is found', async () => {
            MovementRepository.prototype.getInventory.mockResolvedValue(null);

            const result = await movementService.getInventory(1);

            expect(result).toBeUndefined();
        });
    });

    describe('getMovement', () => {
        it('should return movement data when found', async () => {
            const mockData = [{ id: 1, inputs: 10, outputs: 5 }];
            MovementRepository.prototype.getMovement.mockResolvedValue(mockData);

            const result = await movementService.getMovement(1);

            expect(result).toEqual(mockData);
            expect(MovementRepository.prototype.getMovement).toHaveBeenCalledWith(1);
        });

        it('should return undefined when no data is found', async () => {
            MovementRepository.prototype.getMovement.mockResolvedValue(null);

            const result = await movementService.getMovement(1);

            expect(result).toBeUndefined();
        });
    });

    describe('addMovement', () => {
        it('should return added movement data', async () => {
            const mockData = { id: 1, inputs: 10, outputs: 5 };
            MovementRepository.prototype.addMovement.mockResolvedValue(mockData);

            const result = await movementService.addMovement({ inputs: 10, outputs: 5 });

            expect(result).toEqual({});
            expect(MovementRepository.prototype.addMovement).toHaveBeenCalledWith({ inputs: 10, outputs: 5 });
        });

        it('should return undefined when adding fails', async () => {
            MovementRepository.prototype.addMovement.mockResolvedValue(null);

            const result = await movementService.addMovement({ inputs: 10, outputs: 5 });

            expect(result).toBeUndefined();
        });
    });

    describe('addMassive', () => {
        it('should call addMassive on the repository', async () => {
            const mockData = [{ inputs: 10, outputs: 5 }];
            await movementService.addMassive(mockData);

            expect(MovementRepository.prototype.addMassive).toHaveBeenCalledWith(mockData);
        });
    });
});
