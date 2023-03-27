export declare abstract class CustomErrorValidation extends Error {
    abstract statusCode: number;
    constructor();
    abstract serializeError(): {
        message: string;
        field?: string;
    }[];
}
