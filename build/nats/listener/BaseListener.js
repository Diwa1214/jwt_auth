"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseListener = void 0;
class BaseListener {
    constructor(stan) {
        this.ackWait = 5 * 1000;
        this.client = stan;
    }
    subscribtionOption() {
        return this.client.subscriptionOptions()
            .setManualAckMode(true)
            .setDeliverAllAvailable()
            .setDurableName(this.queueGroupName)
            .setAckWait(this.ackWait);
    }
    listen() {
        const subscribe = this.client.subscribe(this.subject, this.queueGroupName, this.subscribtionOption());
        subscribe.on('message', (msg) => {
            console.log(`${msg.getSubject()}`);
            let parsedData = this.parseData(msg);
            this.onMessage(parsedData, msg);
            msg.ack();
        });
    }
    parseData(msg) {
        const data = msg.getData();
        return JSON.parse(data);
    }
}
exports.BaseListener = BaseListener;
