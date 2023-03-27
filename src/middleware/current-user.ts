
import { Request,Response,NextFunction } from "express"
import jwt from "jsonwebtoken"

interface userPayload {
    email:string,
    password:string,
    id:string
}

declare global{
    namespace Express{
       interface Request{
           currentUser:userPayload | null
       }  
    }
}

export const currentUser = function(req:Request,res:Response,next:NextFunction){
  if(req.session?.jwt! == null ||  req.session?.jwt! == undefined){
    console.log(req.session?.jwt,"not_jwt");
    
    req.currentUser = null 
    next()
  }
  const decodeJwt=jwt.verify(req.session?.jwt,process.env.JWTAUTH!) as userPayload
  req.currentUser = decodeJwt 
  console.log('decodejwt',req.currentUser);
  
  next()

}

// Comment 12343
