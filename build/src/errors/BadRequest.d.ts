import { CustomErrorValidation } from "./CustomErrorValidation";
export declare class BadRequest extends CustomErrorValidation {
    message: string;
    statusCode: number;
    constructor(message: string);
    serializeError(): {
        message: string;
        statusCode: number;
    }[];
}
