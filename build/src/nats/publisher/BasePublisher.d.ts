import { Stan } from "node-nats-streaming";
import { Subjects } from "../interface/subject";
interface EventPublisher {
    subjects: Subjects;
    data: {
        id: string;
        title: string;
        price: number;
        userId: string;
    };
}
export declare abstract class BasePulisher<T extends EventPublisher> {
    private client;
    abstract subject: T["subjects"];
    constructor(stan: Stan);
    publisher(event: T["data"]): Promise<void>;
}
export {};
