import { Router } from "express";
import { body } from "express-validator";
import { VALIDATOR_MESSAGE } from "../utils/globals.js";
import validate from "../middleware/validate.js";
import { addMassive, addMovement, getInventory, getMovement } from "../controller/MovementController.js";


const MovementRouter = Router();

const validateAdd = [
    body('concept').notEmpty().withMessage(VALIDATOR_MESSAGE.isRequired).trim().escape(),
    body('productId').isNumeric().withMessage(VALIDATOR_MESSAGE.numberRequired).trim().escape(),
    body('inputs').optional().bail().isInt({ min: 0 }).withMessage(VALIDATOR_MESSAGE.numberRequired),
    body('outputs').optional().bail().isInt({ min: 0 }).withMessage(VALIDATOR_MESSAGE.numberRequired)
        .if(body('inputs').notEmpty().withMessage(VALIDATOR_MESSAGE.isRequired)),
]

const validateMassive = [
    body('*.concept').notEmpty().withMessage(VALIDATOR_MESSAGE.isRequired).trim().escape(),
    body('*.productId').isNumeric().withMessage(VALIDATOR_MESSAGE.numberRequired).trim().escape(),
    body('*.inputs').optional().bail().isInt({ min: 0 }).withMessage(VALIDATOR_MESSAGE.numberRequired),
    body('*.outputs').optional().bail().isInt({ min: 0 }).withMessage(VALIDATOR_MESSAGE.numberRequired)
        .if(body('*.inputs').notEmpty().withMessage(VALIDATOR_MESSAGE.isRequired)),
];

MovementRouter.get('/:productId', getMovement);
MovementRouter.get('/inventory/:productId', getInventory);
MovementRouter.post('/', [...validateAdd, validate], addMovement);
MovementRouter.post('/massive', [...validateMassive, validate], addMassive);

export default MovementRouter;