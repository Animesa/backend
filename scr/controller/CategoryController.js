import Response from "../models/response.js";
import { CategoryService } from "../services/CategoryService.js";
import { ERROR_MESSAGE } from "../utils/globals.js";
import { INTERNALSERVERERROR, NOTFOUND, OK } from "../utils/statusCodes.js";


const categoryService = new CategoryService();

export const getCategories = async (req, res) => {
    const response = await categoryService.getCategories();
    res.status(OK).json(new Response({ data: response }));
}

export const addCategory = async (req, res) => {
    await categoryService.addCategory(req.body).then((response) => {
        if (!response) {
            res.status(NOTFOUND).json(new Response({ data: null }));
            return
        }

        res.status(OK).json(new Response({ data: response }));
    }).catch((error) => {
        res.status(INTERNALSERVERERROR).json(new Response({ success: false, message: ERROR_MESSAGE, errors: error }));
    });
}