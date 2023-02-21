import { Request, Response, NextFunction } from "express";
interface userPayload {
    email: string;
    password: string;
}
declare global {
    namespace Express {
        interface Request {
            currentUser: userPayload | null;
        }
    }
}
export declare const currentUser: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
export {};
