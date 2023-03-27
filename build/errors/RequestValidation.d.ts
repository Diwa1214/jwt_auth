import { ValidationError } from "express-validator";
import { CustomErrorValidation } from "./CustomErrorValidation";
export declare class RequestValidation extends CustomErrorValidation {
    private error;
    statusCode: number;
    constructor(error: ValidationError[]);
    serializeError(): {
        message: any;
        field: string;
    }[];
}
