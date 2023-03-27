"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequest = void 0;
const CustomErrorValidation_1 = require("./CustomErrorValidation");
class BadRequest extends CustomErrorValidation_1.CustomErrorValidation {
    constructor(message) {
        super();
        this.message = message;
        this.statusCode = 400;
    }
    serializeError() {
        return [{
                "message": this.message
            }];
    }
}
exports.BadRequest = BadRequest;
