interface Subscriber {
  update(): void;
}

class Subscriber1 implements Subscriber {
  update(): void {
    console.log("Subscriber 1 recived the update!!");
  }
}

class Subscriber2 implements Subscriber {
  update(): void {
    console.log("Subscriber 2 recived the update!!");
  }
}

class Publisher {
  subscribers: Set<Subscriber> = new Set();

  registerSubscriber(subscriber: Subscriber) {
    this.subscribers.add(subscriber);
  }

  removeSubscriber(subscriber: Subscriber) {
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
