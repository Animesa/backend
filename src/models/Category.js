import { DataTypes } from "sequelize";
import sequelize from "../config/dababase.js";


const Category = sequelize.define('category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

export default Category