import { Message, Stan } from "node-nats-streaming";
import { Subjects } from "../interface/subject";
interface Events {
    subjects: Subjects;
    data: {
        id: string;
        title: string;
        price: number;
        userId: string;
    };
}
export declare abstract class BaseListener<T extends Events> {
    abstract subject: T["subjects"];
    abstract onMessage(event: T["data"], msg: Message): void;
    abstract queueGroupName: string;
    private client;
    private ackWait;
    constructor(stan: Stan);
    subscribtionOption(): import("node-nats-streaming").SubscriptionOptions;
    listen(): void;
    parseData(msg: Message): any;
}
export {};
