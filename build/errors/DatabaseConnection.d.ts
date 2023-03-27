import { CustomErrorValidation } from "./CustomErrorValidation";
export declare class DataBaseValidation extends CustomErrorValidation {
    errors: string;
    statusCode: number;
    constructor();
    serializeError(): {
        message: string;
    }[];
}
