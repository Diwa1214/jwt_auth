import { Stan } from "node-nats-streaming";
import { Subjects } from "../interface/subject";


interface EventPublisher {
    subjects:Subjects
    data:{
        id:string
        title:string
        price:number
        userId:string
    }
}

 export abstract class BasePulisher <T extends EventPublisher> {
   
    private client:Stan
    abstract subject:T["subjects"]

    constructor(stan:Stan){
        this.client = stan
    }

    publisher(event:T["data"]):Promise<void>{

      return  new Promise((resolve, reject)=>{
            this.client.publish(this.subject,JSON.stringify(event),(err)=>{
               if(err){
                  reject(err)
               } 
               console.log(`Event submitted to NATS Streaming server ${this.subject}`);
               resolve()
            })
        })
        
    }
}