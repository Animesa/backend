import Category from "../models/Category.js";
import Product from "../models/Product.js";


export class ProductRepository {
    async getAll() {
        return await Product.findAll({ include: Category, limit: 10 })
    }

    async getProduct(id) {
        return await Product.findByPk(id, { include: Category });
    }

    async addProduct(data) {
        return await Product.create(data);
    }

    async updateProduct(id, data) {
        return await Product.update(data, { where: { id } });
    }
}