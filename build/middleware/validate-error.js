"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationError = void 0;
const express_validator_1 = require("express-validator");
const RequestValidation_1 = require("../errors/RequestValidation");
const validationError = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        console.log(errors, "errors");
        throw new RequestValidation_1.RequestValidation(errors.array());
    }
    return next();
};
exports.validationError = validationError;
