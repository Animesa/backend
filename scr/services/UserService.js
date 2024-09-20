import { generateToken } from "../middleware/auth.js";
import { UserRepository } from "../repositories/UserRepository.js";
import { compare, encrypt } from "../utils/functions.js";

const userRepository = new UserRepository();

export class UserService {
    async getUser(user, password) {

        const userSearch = await userRepository.findUser(user);

        if (!userSearch || !compare(password, userSearch.password)) {
            return
        }

        const userData = {
            ...userSearch.dataValues,
            password: undefined
        }

        const response = {
            user: userData,
            token: generateToken(userData)
        }

        return response;
    }

    async addUser(data) {
        const password = await encrypt(data.password);
        const inputData = {
            ...data,
            password
        }

        const userCreated = await userRepository.addUser(inputData);

        return {
            ...userCreated.dataValues,
            password: undefined
        }
    }
}