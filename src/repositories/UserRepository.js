import sequelize from "../config/dababase.js";
import Users from "../models/Users.js";

export class UserRepository {
    async findUser(user) {
        return await Users.findOne({
            where: {
                user: user
            }
        });
    }

    async addUser(data) {
        return await Users.create(data);
    }
};