import sequelize from "../config/dababase.js";
import Category from "../models/Category.js";

export class CategoryRepository {
    async getCategories() {
        return await Category.findAll();
    }

    async addCategory(data) {
        return await Category.create(data);
    }
}