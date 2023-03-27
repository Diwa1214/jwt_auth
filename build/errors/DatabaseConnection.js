"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBaseValidation = void 0;
const CustomErrorValidation_1 = require("./CustomErrorValidation");
class DataBaseValidation extends CustomErrorValidation_1.CustomErrorValidation {
    constructor() {
        super();
        this.errors = "DB connection is failed";
        this.statusCode = 500;
        //   Object.setPrototypeOf(this,RequestValidation.prototype)
    }
    serializeError() {
        return [
            {
                "message": this.errors
            }
        ];
    }
}
exports.DataBaseValidation = DataBaseValidation;
