import cookieSession from "cookie-session"
import express from "express"
import jwt from  "jsonwebtoken"
import { Auth, RequestErrorHandling } from "./src"
import { currentUser } from "./src/middleware/current-user"
import { generateToken,refreshToken } from "./src/middleware/jwt-signin"


const app = express()

app.use(express.json())


app.set('trust proxy',1)

app.use(cookieSession({
  secure:false,
  signed:false
}))

interface userPayload {
   email:string,
   password:string,
}


app.get("/", function(req,res){
    return res.status(201).send("Hai")
})

app.post("/demo_login",async(req,res)=>{
   const {email,password} = req.body 
   let payload = {email,password}
   let data = {
      payload:payload,
      session: true,
      secret_key:'demo_login',
      expireIn:"25s",
      refresh_token:{
         expireIn:"80s"
      }
   }
  let token = await generateToken<userPayload>(req,data)
  return res.status(200).send(token)
})

app.get("/current", currentUser, Auth,(req,res)=>{
   return res.send(req.currentUser)
})

app.get('/refresh_token', (req,res)=>{
   let token = refreshToken<userPayload>(req,"25s",false);
   return res.send(token)
})

app.post("/logout", (req,res)=>{
   req.session = null
   req.headers.authorization = undefined
   return res.send(req.currentUser)
})

app.get("/verify",(req,res)=>{
    let valid_token = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRpd2EiLCJwYXNzd29yZCI6MTIxMzQsImlhdCI6MTY4MDkzOTkyNywiZXhwIjoxNjgwOTQwMDQ3fQ.a07JOFOjUqjJU5w3fElFKrzN7zjMzSb3QYVIOzlh--4",'demo_login')

    return res.send(valid_token)
})

app.use(RequestErrorHandling)

const startFunction = function(){
   // if(process.env.JWT_AUTH! == undefined){
   //    throw new Error("jwt is not defined") 
   // }


   app.listen(3000,()=>{
      console.log("Connected successfully")
   })
}

startFunction()
