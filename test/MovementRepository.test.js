import { MovementRepository } from '../src/repositories/MovementRepository.js';
import sequelize from '../src/config/dababase.js';
import Movement from '../src/models/Movement.js';

jest.mock('../src/models/Movement.js', () => ({
    belongsTo: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    bulkCreate: jest.fn()
}));
jest.mock('../src/models/Product.js');

jest.mock('../src/config/dababase.js', () => ({
    query: jest.fn(),
    define: jest.fn()
}));

describe('MovementRepository', () => {
    let movementRepository;

    beforeEach(() => {
        movementRepository = new MovementRepository();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getInventory', () => {
        it('should return inventory data for a given productId', async () => {
            const mockResult = [{ id: 1, categoryName: 'Category 1', productName: 'Product 1', price: 100, totalInputs: 10, totalOutputs: 5 }];
            sequelize.query.mockResolvedValue(mockResult);
            const productId = 1;

            const result = await movementRepository.getInventory(productId);

            expect(result).toEqual(mockResult);
            expect(sequelize.query).toHaveBeenCalledWith(expect.any(String), {
                replacements: { productId },
                type: expect.anything(),
            });
        });
    });

    describe('getMovement', () => {
        it('should return movements for a given productId', async () => {
            const mockMovements = [{ id: 1, productId: 1, inputs: 5, outputs: 2 }];
            Movement.findAll.mockResolvedValue(mockMovements);
            const productId = 1;

            const result = await movementRepository.getMovement(productId);

            expect(result).toEqual(mockMovements);
            expect(Movement.findAll).toHaveBeenCalledWith({ where: { productId } });
        });
    });

    describe('addMovement', () => {
        it('should add a movement', async () => {
            const mockMovement = { id: 1, productId: 1, inputs: 5, outputs: 2 };
            Movement.create.mockResolvedValue(mockMovement);

            const result = await movementRepository.addMovement({ productId: 1, inputs: 5, outputs: 2 });

            expect(result).toEqual(mockMovement);
            expect(Movement.create).toHaveBeenCalledWith({ productId: 1, inputs: 5, outputs: 2 });
        });
    });

    describe('addMassive', () => {
        it('should add multiple movements', async () => {
            const mockMovements = [{ id: 1, productId: 1, inputs: 5, outputs: 2 }];
            Movement.bulkCreate.mockResolvedValue(mockMovements);

            const result = await movementRepository.addMassive([{ productId: 1, inputs: 5, outputs: 2 }]);

            expect(result).toEqual(mockMovements);
            expect(Movement.bulkCreate).toHaveBeenCalledWith([{ productId: 1, inputs: 5, outputs: 2 }]);
        });
    });
});
