
import jwt from  "jsonwebtoken"
import cookieSession from "cookie-session"
import express from "express"
import { Request } from "express"
import { InvalidCredentialError } from "../errors/InvalidCredential"

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


export const jwt_sign = async <T> (req:Request,data:Payload):Promise<any>=>{
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
     console.log(err)
   }   
}

export const refresh_token  = async <T> (req:Request)=>{
   console.log(req?.session);
   try{
      let verify_refresh_token =  await jwt.verify(req?.session?.refresh_token!,'demo_login') as RefreshTokenPayload<T>      
      if(verify_refresh_token){
          let decodeJwt = verify_refresh_token.user
          let payload = {
            "user":decodeJwt
          }
          let reassign_access_token =  await jwt.sign(payload,'demo_login',{expiresIn:"10s"})
          console.log(reassign_access_token);
          
          req.session= {
            'access_token' : reassign_access_token,
            'refresh_token': req?.session?.refresh_token
          }

          return reassign_access_token
      }
    
   }
   catch(err){      
      throw new InvalidCredentialError()
   }   
}