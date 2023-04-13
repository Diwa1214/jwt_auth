import { CustomErrorValidation } from "./CustomErrorValidation";
export declare class InvalidCredentialError extends CustomErrorValidation {
    statusCode: number;
    constructor();
    serializeError(): {
        message: string;
        statusCode: number;
    }[];
}
