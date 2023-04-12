
import jwt from  "jsonwebtoken"
import cookieSession from "cookie-session"
import express from "express"
import { Request } from "express"
import { InvalidCredentialError } from "../errors/InvalidCredential"
import { BadRequest } from "../errors/BadRequest"
import { InvalidTokenError } from "../errors/InvalidTokenError"

const app = express()

interface Payload {
    session: boolean,
    payload: object | any,
    secret_key : string,
    expireIn?:string,
    algorithm?:string,
    refresh_token:{
        expireIn?:string, 
    }

}



interface RefreshTokenPayload<T>  {
   user: T;
}

interface result {
    access_token: string,
    refresh_token:string
}

app.set("trust proxy",1)

app.use(cookieSession({
  secure:true,
  signed:false
}))


export const generateToken = async <T> (req:Request,data:Payload):Promise<any>=>{
   try{
      const payload:RefreshTokenPayload<T> ={
         'user':data.payload
      }
      let access_token = await jwt.sign(payload,data.secret_key,{expiresIn:data?.expireIn})
      let refresh_token = await jwt.sign(payload,data.secret_key,{expiresIn:data?.refresh_token?.expireIn})
      if(data?.session){
         req.session= {
             'access_token' : access_token,
             'refresh_token': refresh_token
         }
      }
      return {access_token,refresh_token}
   }
   catch(err){
      throw new BadRequest('Something went wrong while processing jwt sign')
   }   
}

export const refreshToken  =  <T> (req:Request,expireIn:string,session:boolean)=>{
   try{
      let token = null 
      if(req.headers.authorization !== undefined){
        let authHeader = req.headers.authorization        
        if(authHeader && authHeader.startsWith("Bearer")){
             console.log(authHeader.split(" ")[1]);
             
            token = authHeader.split(" ")[1]
        }
      }
      else if(req.session?.refresh_token! !== null){
           token = req.session?.refresh_token
      }
      console.log(token,"token")
      if(token !== null || token !== undefined){
         let verify_refresh_token = jwt.verify(token!,process.env.JWT_AUTH!) as RefreshTokenPayload<T>      
         if(verify_refresh_token){
            let decodeJwt = verify_refresh_token.user
            let payload = {
               "user":decodeJwt
            }
            let reassign_access_token = jwt.sign(payload,process.env.JWT_AUTH!,{expiresIn:expireIn})
            if(session){
               req.session= {
                  'access_token' : reassign_access_token,
                  'refresh_token': req?.session?.refresh_token
               }
            } 
            
            
            return reassign_access_token
         }

      }
         
   }
   catch(err){   
      throw new InvalidTokenError("refresh token get expired kindly login again")
   }  

}