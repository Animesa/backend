import { Router } from "express";
import { body, param } from "express-validator";
import validate from "../middleware/validate.js";
import { addProduct, getAll, getProduct, updateProduct } from "../controller/ProductController.js";
import { VALIDATOR_MESSAGE } from "../utils/globals.js";


const ProductRoute = Router();

const validateAdd = [
    body('productName').notEmpty().withMessage(VALIDATOR_MESSAGE.isRequired).trim().escape(),
    body('price').isCurrency().trim().escape(),
    body('categoryId').isNumeric().trim().escape()
]

const validateUpdate = [
    param('id').notEmpty().withMessage(VALIDATOR_MESSAGE.isRequired).trim().escape(),
    body('productName').notEmpty().withMessage(VALIDATOR_MESSAGE.isRequired).trim().escape(),
    body('price').isCurrency().trim().escape(),
    body('categoryId').isNumeric().trim().escape()
]

ProductRoute.get('/', getAll)
ProductRoute.get('/:id', getProduct)
ProductRoute.post('/', [...validateAdd, validate], addProduct);
ProductRoute.put('/:id', [...validateUpdate, validate], updateProduct);


export default ProductRoute;