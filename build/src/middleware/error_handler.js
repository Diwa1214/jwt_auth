"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestErrorHandling = void 0;
const CustomErrorValidation_1 = require("../errors/CustomErrorValidation");
const RequestErrorHandling = function (err, req, res, next) {
    if (err instanceof CustomErrorValidation_1.CustomErrorValidation) {
        res.status(err.statusCode).send(err.serializeError());
    }
};
exports.RequestErrorHandling = RequestErrorHandling;
