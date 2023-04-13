import { Request } from "express";
interface Payload {
    session: boolean;
    payload: object | any;
    secret_key: string;
    expireIn?: string;
    algorithm?: string;
    refresh_token: {
        expireIn?: string;
    };
}
export declare const generateToken: (req: Request, data: Payload) => Promise<any>;
export declare const refreshToken: (req: Request, expireIn: string, session: boolean) => string | undefined;
export {};
