import { validationResult } from "express-validator";
import { validateFormatter } from "../utils/functions.js";
import { BADREQUEST } from "../utils/statusCodes.js";
import Response from "../models/response.js";
import { ERROR_MESSAGE } from "../utils/globals.js";


const validate = (req, res, next) => {

    const errors = validationResult(req).formatWith(validateFormatter);

    if (!errors.isEmpty()) {
        return res.status(BADREQUEST).json(new Response({ success: false, message: ERROR_MESSAGE, errors: errors.array() })).end();
    }

    return next();
};

export default validate;