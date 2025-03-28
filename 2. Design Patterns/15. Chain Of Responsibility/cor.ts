interface Handler {
  setNext(next: Handler): void;
  handle(request: any): void;
}

class BaseHandler implements Handler {
  private next: Handler | null = null;

  setNext(next: Handler) {
    this.next = next;
  }

  handle(request: any): void {
    console.log("Base Handler");
    if (this.next) {
      this.next.handle(request);
    }
  }
}

class HandlerA extends BaseHandler {
  handle(request: any): void {
    console.log("HandlerA");
    super.handle(request);
  }
}

class HandlerB extends BaseHandler {
  handle(request: any): void {
    console.log("HandlerB");
    super.handle(request);
  }
}

const handlerA = new HandlerA();
const handlerB = new HandlerB();
handlerA.setNext(handlerB);

handlerA.handle("Say Hi");
