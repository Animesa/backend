import { MovementRepository } from "../repositories/MovementRepository.js";


const movementRepository = new MovementRepository();

export class MovementService {

    async getInventory(productId) {
        const response = await movementRepository.getInventory(productId);
        if (!response) return
        return response;
    }

    async getMovement(productId) {
        const response = await movementRepository.getMovement(productId);
        if (!response) return
        return response;
    }

    async addMovement(data) {
        const response = await movementRepository.addMovement(data);
        if (!response) return
        return { ...response.dataValues };
    }

    async addMassive(data) {
        await movementRepository.addMassive(data);
    }
}