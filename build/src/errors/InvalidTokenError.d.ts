import { CustomErrorValidation } from "./CustomErrorValidation";
export declare class InvalidTokenError extends CustomErrorValidation {
    statusCode: number;
    message: string;
    constructor(message: string);
    serializeError(): {
        message: string;
        field?: string | undefined;
        statusCode?: number | undefined;
    }[];
}
