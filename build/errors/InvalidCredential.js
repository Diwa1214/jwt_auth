"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidCredentialError = void 0;
const CustomErrorValidation_1 = require("./CustomErrorValidation");
class InvalidCredentialError extends CustomErrorValidation_1.CustomErrorValidation {
    constructor() {
        super();
        this.statusCode = 401;
    }
    serializeError() {
        return [{ message: "Invalid credentials" }];
    }
}
exports.InvalidCredentialError = InvalidCredentialError;
