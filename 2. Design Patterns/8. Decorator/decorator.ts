class Notifier {
  send(message: string) {
    console.log("Message Sent!", message);
  }
}

class BaseDecorator {
  wrapee: Notifier;
  constructor(notifier: Notifier) {
    this.wrapee = notifier;
  }
  send(message: string) {
    this.wrapee.send(message);
  }
}

class SMSDecorator extends BaseDecorator {
  send(message: string): void {
    super.send(message);
    console.log(`${message} sent through SMS`);
  }
}

class FBDecorator extends BaseDecorator {
  send(message: string): void {
    super.send(message);
    console.log(`${message} sent through FaceBook`);
  }
}

class SlackDecorator extends BaseDecorator {
  send(message: string): void {
    super.send(message);
    console.log(`${message} sent through Slack`);
  }
}

let stack = new Notifier();
stack = new SMSDecorator(stack);
stack = new SlackDecorator(stack);

stack.send("Hi");

// adding the FB notifier in run time
stack = new FBDecorator(stack);
stack.send("Hello");