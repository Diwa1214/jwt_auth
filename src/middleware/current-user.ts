
import { Request,Response,NextFunction } from "express"
import jwt from "jsonwebtoken"
import { InvalidCredentialError } from "../errors/InvalidCredential"
import * as dotenv from   "dotenv"
import { InvalidTokenError } from "../errors/InvalidTokenError"

dotenv.config()

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
  let token = null
  console.log(req.session,req.headers.authorization)
  if(req.headers.authorization !== undefined){
    const authHeader = req.headers.authorization
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(' ')[1] 
    }
  }
  else if(req.session?.access_token! !== null){
     token = req.session?.access_token
  }
  if(token! == null ||  token! == undefined){    
    req.currentUser = null 
    next()
  }
  try{
    let verfiy_access_token = jwt.verify(token,process.env.JWT_AUTH!)
    if(verfiy_access_token){
      const decodeJwt= verfiy_access_token
      req.currentUser = decodeJwt 
      next()  
    }
  }
  catch(err){
    throw new InvalidTokenError("access token get expired kindly get the access token again by using refresh token")
  }
  

}



// Comment 12343
