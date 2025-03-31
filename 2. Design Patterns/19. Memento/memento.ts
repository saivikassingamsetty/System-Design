class CareTaker {
  originator: Originator;
  history: Memento[] = [];

  constructor(originator: Originator) {
    this.originator = originator;
  }

  save() {
    const snapshot = this.originator.save();
    this.history.push(snapshot);
  }

  undo() {
    if (this.history.length === 0) {
      console.log("No more states to undo");
      return;
    }
    const snapshot = this.history.pop();
    this.originator.restore(snapshot);
  }
}

interface State {
  text: string;
  cursorPos: number;
  currentFont: number;
}

class Memento {
  private state: State;

  constructor(state: State) {
    this.state = state;
  }

  getState(): State {
    return this.state;
  }
}

class Originator {
  private state: State = { text: "", cursorPos: 0, currentFont: 12 };

  getState() {
    console.log(
      `Current Text is ${this.state.text}, Current Cursor Position is at ${this.state.cursorPos}, Current Font Size is ${this.state.currentFont}`
    );
  }

  setText(text: string) {
    this.state.text = text;
  }

  setFontSize(size: number) {
    this.state.currentFont = size;
  }

  save(): Memento {
    return new Memento(structuredClone(this.state));
  }

  restore(snapshot: Memento | undefined): void {
    this.state = Object.assign(this.state, snapshot?.getState());
  }
}

const originator = new Originator();
const command = new CareTaker(originator);

// to save the default
command.save();

console.log("Initial State");
originator.getState();

console.log("type heading, change font size to 16 and save it");
originator.setText("Heading");
originator.setFontSize(16);
command.save();
originator.getState();

console.log("change font size to 18 and undo it");
originator.setFontSize(18);
originator.getState();

console.log("undoing");
command.undo();
originator.getState();

console.log("undoing");
command.undo();
originator.getState();
