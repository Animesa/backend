import Response from "../models/response.js";
import { MovementService } from "../services/MovementService.js";
import { ERROR_MESSAGE } from "../utils/globals.js";
import { BADREQUEST, CREATED, INTERNALSERVERERROR, NOTFOUND, OK } from "../utils/statusCodes.js";


const movementService = new MovementService();

export const getInventory = async (req, res) => {
    const { productId } = req.params
    await movementService.getInventory(productId).then((response) => {
        if (!response) {
            res.status(NOTFOUND).json(new Response({ data: null }));
            return
        }

        res.status(OK).json(new Response({ data: response }));
    }).catch((error) => {
        res.status(INTERNALSERVERERROR).json(new Response({ success: false, message: ERROR_MESSAGE, errors: error }));
    });
}

export const getMovement = async (req, res) => {
    const { productId } = req.params
    await movementService.getMovement(productId).then((response) => {
        if (!response) {
            res.status(NOTFOUND).json(new Response({ data: null }));
            return
        }

        res.status(OK).json(new Response({ data: response }));
    }).catch((error) => {
        res.status(INTERNALSERVERERROR).json(new Response({ success: false, message: ERROR_MESSAGE, errors: error }));
    });
}

export const addMovement = async (req, res) => {
    const { user: { id: userId } } = req;
    const data = { ...req.body, userId }

    await movementService.addMovement(data).then((response) => {
        if (!response) {
            res.status(NOTFOUND).json(new Response({ data: null }));
            return
        }

        res.status(CREATED).json(new Response({ data: response }));
    }).catch((error) => {
        res.status(INTERNALSERVERERROR).json(new Response({ success: false, message: ERROR_MESSAGE, errors: error }));
    });
}

export const addMassive = async (req, res) => {
    const { user: { id: userId } } = req;

    if (!Array.isArray(req.body)) {
        return res.status(BADREQUEST).json(new Response({ success: false, message: 'El cuerpo de la solicitud debe ser un array.' }));
    }

    const data = req.body.map(item => ({ ...item, userId }));

    await movementService.addMassive(data).then((response) => {
        res.status(CREATED).json(new Response({ data: response }));
    }).catch((error) => {
        res.status(INTERNALSERVERERROR).json(new Response({ success: false, message: ERROR_MESSAGE, errors: error }));
    });
}