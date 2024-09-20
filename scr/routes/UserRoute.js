import { Router } from "express";
import { addUser, getUser } from "../controller/UserController.js";
import { body } from "express-validator";
import { VALIDATOR_MESSAGE } from "../utils/globals.js";
import validate from "../middleware/validate.js";

const UserRoute = Router();


const validateLogin = [
    body('user').notEmpty().withMessage(VALIDATOR_MESSAGE.isRequired).trim().escape(),
    body('password').notEmpty().withMessage(VALIDATOR_MESSAGE.isRequired).bail().isLength({ min: 8 }).withMessage(VALIDATOR_MESSAGE.passwordMinimun).trim().escape()
]

const validateCreate = [
    body('fullName').notEmpty().withMessage(VALIDATOR_MESSAGE.isRequired).trim().escape(),
    body('user').notEmpty().withMessage(VALIDATOR_MESSAGE.isRequired).trim().escape(),
    body('password').notEmpty().withMessage(VALIDATOR_MESSAGE.isRequired).bail().isLength({ min: 8 }).withMessage(VALIDATOR_MESSAGE.passwordMinimun).trim().escape()
]

UserRoute.post('/login', [...validateLogin, validate], getUser);
UserRoute.post('/create', [...validateCreate, validate], addUser);

export default UserRoute;