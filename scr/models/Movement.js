import { DataTypes } from "sequelize";
import sequelize from "../config/dababase.js";
import Users from "./Users.js"

const Movement = sequelize.define('movement', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    concept: {
        type: DataTypes.STRING,
        allowNull: false
    },
    entryAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    inputs: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: { min: 0 }
    },
    outputs: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: { min: 0 }
    }
}, {
    timestamps: false
});

Movement.belongsTo(Users, { foreignKey: 'userId' });

export default Movement;