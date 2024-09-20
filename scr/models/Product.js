import { DataTypes } from "sequelize";
import sequelize from "../config/dababase.js";
import Category from "./Category.js";
import Movement from "./Movement.js";


const Product = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DOUBLE,
        defaultValue: 0
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

Product.belongsTo(Category, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
Product.hasMany(Movement, { foreignKey: 'productId' })

export default Product;