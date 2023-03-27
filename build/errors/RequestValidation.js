"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidation = void 0;
const CustomErrorValidation_1 = require("./CustomErrorValidation");
class RequestValidation extends CustomErrorValidation_1.CustomErrorValidation {
    constructor(error) {
        super();
        this.error = error;
        this.statusCode = 400;
        //   Object.setPrototypeOf(this,RequestValidation.prototype)
    }
    serializeError() {
        return this.error.map((err) => {
            return { 'message': err.msg, 'field': err.param };
        });
    }
}
exports.RequestValidation = RequestValidation;
