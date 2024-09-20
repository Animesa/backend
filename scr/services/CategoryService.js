import { CategoryRepository } from "../repositories/CategoryRepository.js";


const categoryRepository = new CategoryRepository();

export class CategoryService {
    async getCategories() {
        return await categoryRepository.getCategories();
    }

    async addCategory(data) {
        const response = await categoryRepository.addCategory(data);
        if (!response) return
        return { ...response.dataValues };
    }
}