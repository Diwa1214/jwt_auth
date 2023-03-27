import { Message, Stan } from "node-nats-streaming"
import { Subjects } from "../interface/subject"


 interface Events {
     subjects: Subjects,
     data:{
        id: string
        title: string
        price: number
        userId: string
     }
 }

 export abstract class BaseListener <T extends Events> {
    abstract subject: T["subjects"]
    abstract onMessage(event:T["data"],msg:Message):void 
    abstract queueGroupName: string
    private client:Stan
    private ackWait = 5*1000

    constructor(stan:Stan){
        this.client = stan
    }

    subscribtionOption(){
       return this.client.subscriptionOptions()
              .setManualAckMode(true)
              .setDeliverAllAvailable()
              .setDurableName(this.queueGroupName)
              .setAckWait(this.ackWait)
    }

   public listen(){
      const subscribe  = this.client.subscribe(this.subject,this.queueGroupName,this.subscribtionOption())

      subscribe.on('message',(msg:Message)=>{
          console.log(`${msg.getSubject()}`);
          let parsedData  = this.parseData(msg)

          this.onMessage(parsedData,msg)

          msg.ack()
      })
    }

    public parseData(msg:Message){
       const data:any  = msg.getData()
       return JSON.parse(data)
    }

}