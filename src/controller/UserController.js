import Response from "../models/response.js";
import { UserService } from "../services/UserService.js";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../utils/globals.js";
import { INTERNALSERVERERROR, NOTFOUND, OK } from "../utils/statusCodes.js";

const userService = new UserService();

export const getUser = async (req, res) => {
    const { user, password } = req.body;

    await userService.getUser(user, password).then((response) => {
        if (!response) {
            res.status(NOTFOUND).json(new Response({ data: null }));
            return
        }

        res.status(OK).json(new Response({ data: response }));
    }).catch((error) => {
        res.status(INTERNALSERVERERROR).json(new Response({ success: false, message: ERROR_MESSAGE, errors: error }));
    });

};

export const addUser = async (req, res) => {
    await userService.addUser(req.body).then((response) => {
        res.status(OK).json(new Response({ success: true, message: SUCCESS_MESSAGE, data: response }));
    }).catch((error) => {
        res.status(INTERNALSERVERERROR).json(new Response({ success: false, message: ERROR_MESSAGE, errors: error }));
    });
};