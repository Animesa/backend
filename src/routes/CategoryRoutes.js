import { Router } from "express";
import { addCategory, getCategories } from "../controller/CategoryController.js";
import { body } from "express-validator";
import { VALIDATOR_MESSAGE } from "../utils/globals.js";
import validate from "../middleware/validate.js";


const CategoryRoute = Router();

const validateAdd = [
    body('categoryName').notEmpty().withMessage(VALIDATOR_MESSAGE.isRequired).trim().escape()
]

CategoryRoute.get('/', getCategories);
CategoryRoute.post('/', [...validateAdd, validate], addCategory);

export default CategoryRoute;