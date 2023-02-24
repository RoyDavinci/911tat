import {check} from "express-validator";
import validationErrorHandler from "../../utils/validationErrorrHandler";

export const clientCreateValidator = [
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
        .withMessage("email is requiredd")
        .bail()
        .isEmail()
        .withMessage("email field must be of email type"),
    validationErrorHandler,
];
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
        .withMessage("email is requiredd")
        .bail()
        .isEmail()
        .withMessage("email field must be of email type"),
    check("phone")
        .notEmpty()
        .withMessage("phone is required")
        .bail()
        .isMobilePhone("en-NG", {strictMode: true})
        .withMessage("mobile must be nigerian number")
        .bail()
        .isString()
        .withMessage("phone must be string"),
    validationErrorHandler,
];
