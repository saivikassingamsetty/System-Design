// Command
interface RemoteCommand {
  execute(): void;
  undo(): void;
}

// Reciever
class Light {
  on() {
    console.log("The light is on");
  }

  off() {
    console.log("The light is off");
  }
}

// Concrete Commands
class LightOnCommand implements RemoteCommand {
  private light: Light = new Light();

  execute(): void {
    this.light.on();
  }
  undo(): void {
    this.light.off();
  }
}

class LightOffCommand implements RemoteCommand {
  private light: Light = new Light();

  execute(): void {
    this.light.off();
  }
  undo(): void {
    this.light.on();
  }
}

// Invoker
class Remote {
  private command: RemoteCommand | null = null;

  setCommand(command: RemoteCommand) {
    this.command = command;
  }

  pressButton() {
    this.command?.execute();
  }

  pressUndo() {
    this.command?.undo();
  }
}

const newRemote = new Remote();
const lightOn = new LightOnCommand();
const lightOff = new LightOffCommand();

newRemote.setCommand(lightOn);
newRemote.pressButton();
newRemote.pressUndo();

// changing the command at run time
newRemote.setCommand(lightOff);
newRemote.pressButton();
newRemote.pressUndo();
