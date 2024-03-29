/* eslint-disable import/prefer-default-export */
import {check} from "express-validator";
import validationErrorHandler from "../../utils/validationErrorrHandler";

export const escortCreateValidator = [
    check("username")
        .isString()
        .withMessage("username must be string")
        .bail()
        .notEmpty()
        .withMessage("username must not be empty"),
    check("password")
        .notEmpty()
        .withMessage("password must not be empty")
        .bail()
        .isString()
        .withMessage("password must be string"),
    check("email")
        .notEmpty()
        .withMessage("email is required")
        .bail()
        .isEmail()
        .withMessage("email field must be of email type"),
    check("confirmPassword")
        .exists({checkFalsy: true})
        .withMessage("You must type a confirmation password")
        .custom((value, {req}) => value === req.body.password)
        .withMessage("The passwords do not match"),
    validationErrorHandler,
];
