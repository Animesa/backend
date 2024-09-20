import { QueryTypes } from "sequelize";
import sequelize from "../config/dababase.js";
import Movement from "../models/Movement.js";


export class MovementRepository {
    async getInventory(productId) {
        return await sequelize.query(
            "SELECT products.id, categories.categoryName, products.productName, products.price, COALESCE(SUM(inputs),0) AS totalInputs, COALESCE(SUM(outputs),0) AS totalOutputs FROM products INNER JOIN categories ON products.categoryId = categories.id LEFT JOIN movements ON products.id = movements.productId WHERE products.id = :productId GROUP BY products.id",
            {
                replacements: { productId },
                type: QueryTypes.SELECT
            }
        );
    }

    async getMovement(productId) {
        return await Movement.findAll({ where: { productId } })
    }

    async addMovement(data) {
        return await Movement.create(data);
    }

    async addMassive(data) {
        return await Movement.bulkCreate(data);
    }
}