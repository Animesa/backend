import { ProductRepository } from "../repositories/ProductRepository.js";


const productRepository = new ProductRepository();

export class ProductService {

    async getAll() {
        const response = await productRepository.getAll();
        if (!response) return
        return response;
    }

    async getProduct(id) {
        const response = await productRepository.getProduct(id);
        if (!response) return
        return response;
    }

    async addProduct(data) {
        const response = await productRepository.addProduct(data);
        if (!response) return
        return { ...response.dataValues };
    }

    async updateProduct(id, data) {
        const response = await productRepository.updateProduct(id, data);
        if (!response) return
        return { ...response.dataValues };
    }
}