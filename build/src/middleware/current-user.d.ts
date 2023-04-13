import { Request, Response, NextFunction } from "express";
declare global {
    namespace Express {
        interface Request {
            currentUser: any | null;
        }
    }
}
export declare const currentUser: (req: Request, res: Response, next: NextFunction) => void;
