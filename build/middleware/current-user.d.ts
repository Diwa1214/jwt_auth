import { Request, Response, NextFunction } from "express";
interface userPayload {
    email: string;
    password: string;
    id: string;
}
declare global {
    namespace Express {
        interface Request {
            currentUser: userPayload | null;
        }
    }
}
export declare const currentUser: (req: Request, res: Response, next: NextFunction) => void;
export {};
