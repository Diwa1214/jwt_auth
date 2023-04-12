import { CustomErrorValidation } from "./CustomErrorValidation";


export class InvalidTokenError extends CustomErrorValidation{
     statusCode: number = 401;
     public message:string = ''

    constructor(message:string){
        super()
        this.message = message
    }

    serializeError(): { message: string; field?: string | undefined; statusCode?: number | undefined; }[] {
        return [
            {
                "message": this.message,
                "statusCode":this.statusCode
            }
        ]
    }
}