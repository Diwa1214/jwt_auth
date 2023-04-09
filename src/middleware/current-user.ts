
import { Request,Response,NextFunction } from "express"
import jwt from "jsonwebtoken"
import { InvalidCredentialError } from "../errors/InvalidCredential"

interface userPayload {
    email:string,
    password:string,
    id:string
}

declare global{
    namespace Express{
       interface Request{
           currentUser:any | null
       }  
    }
}

export const currentUser = function(req:Request,res:Response,next:NextFunction){
  if(req.session?.access_token! == null ||  req.session?.access_token! == undefined){    
    req.currentUser = null 
    next()
  }
  try{
    let verfiy_access_token = jwt.verify(req.session?.access_token,'demo_login')
    if(verfiy_access_token){
      
      const decodeJwt= verfiy_access_token
      req.currentUser = decodeJwt 
      next()  
    }
  }
  catch(err){
      throw new InvalidCredentialError()
  }
  

}

// Comment 12343
