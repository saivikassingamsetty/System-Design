"use strict";
class Subscriber1 {
    update() {
        console.log("Subscriber 1 recived the update!!");
    }
}
class Subscriber2 {
    update() {
        console.log("Subscriber 2 recived the update!!");
    }
}
class Publisher {
    constructor() {
        this.subscribers = new Set();
    }
    registerSubscriber(subscriber) {
        this.subscribers.add(subscriber);
    }
    removeSubscriber(subscriber) {
        this.subscribers.delete(subscriber);
    }
    notifySubscribers() {
        for (let subscriber of this.subscribers) {
            subscriber.update();
        }
    }
}
const publisher = new Publisher();
const subscriber1 = new Subscriber1();
const subscriber2 = new Subscriber2();
publisher.registerSubscriber(subscriber1);
publisher.registerSubscriber(subscriber2);
publisher.notifySubscribers();
publisher.removeSubscriber(subscriber1);
publisher.notifySubscribers();
