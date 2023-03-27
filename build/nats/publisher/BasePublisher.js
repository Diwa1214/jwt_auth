"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePulisher = void 0;
class BasePulisher {
    constructor(stan) {
        this.client = stan;
    }
    publisher(event) {
        return new Promise((resolve, reject) => {
            this.client.publish(this.subject, JSON.stringify(event), (err) => {
                if (err) {
                    reject(err);
                }
                console.log(`Event submitted to NATS Streaming server ${this.subject}`);
                resolve();
            });
        });
    }
}
exports.BasePulisher = BasePulisher;
