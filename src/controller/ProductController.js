import Response from "../models/response.js";
import { ProductService } from "../services/ProductService.js";
import { ERROR_MESSAGE } from "../utils/globals.js";
import { CREATED, INTERNALSERVERERROR, NOCONTENT, NOTFOUND, OK } from "../utils/statusCodes.js";


const productService = new ProductService();

export const getAll = async (req, res) => {
    await productService.getAll().then((response) => {
        if (!response) {
            res.status(NOTFOUND).json(new Response({ data: null }));
            return
        }

        res.status(OK).json(new Response({ data: response }));
    }).catch((error) => {
        res.status(INTERNALSERVERERROR).json(new Response({ success: false, message: ERROR_MESSAGE, errors: error }));
    });
}

export const getProduct = async (req, res) => {
    const { id } = req.params;
    await productService.getProduct(id).then((response) => {
        if (!response) {
            res.status(NOTFOUND).json(new Response({ data: null }));
            return
        }

        res.status(OK).json(new Response({ data: response }));
    }).catch((error) => {
        res.status(INTERNALSERVERERROR).json(new Response({ success: false, message: ERROR_MESSAGE, errors: error }));
    });
}

export const addProduct = async (req, res) => {
    await productService.addProduct(req.body).then((response) => {
        if (!response) {
            res.status(NOTFOUND).json(new Response({ data: null }));
            return
        }

        res.status(CREATED).json(new Response({ data: response }));
    }).catch((error) => {
        res.status(INTERNALSERVERERROR).json(new Response({ success: false, message: ERROR_MESSAGE, errors: error }));
    });
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    await productService.updateProduct(id, data).then((response) => {
        res.status(OK).json(new Response({ data: undefined }));
    }).catch((error) => {
        res.status(INTERNALSERVERERROR).json(new Response({ success: false, message: ERROR_MESSAGE, errors: error }));
    });
}