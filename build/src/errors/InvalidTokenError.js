"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTokenError = void 0;
const CustomErrorValidation_1 = require("./CustomErrorValidation");
class InvalidTokenError extends CustomErrorValidation_1.CustomErrorValidation {
    constructor(message) {
        super();
        this.statusCode = 401;
        this.message = '';
        this.message = message;
    }
    serializeError() {
        return [
            {
                "message": this.message,
                "statusCode": this.statusCode
            }
        ];
    }
}
exports.InvalidTokenError = InvalidTokenError;
