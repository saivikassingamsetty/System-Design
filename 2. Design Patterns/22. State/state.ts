interface MyState {
  setContext(context: MyContext): void;
  doThis(): void;
  doThat(): void;
}

class ConcreteState implements MyState {
  protected context: MyContext | null = null;

  setContext(context: MyContext): void {
    this.context = context;
  }

  doThis(): void {
    console.log("ConcreteState doing this");
    // Optionally transition to another state
  }

  doThat(): void {
    console.log("ConcreteState switching to OtherState");
    const state = new OtherState();
    this.context?.changeState(state);
  }
}

class OtherState implements MyState {
  private context: MyContext | null = null;

  setContext(context: MyContext): void {
    this.context = context;
  }

  doThis(): void {
    console.log("OtherState switching to ConcreteState");
    const state = new ConcreteState();
    this.context?.changeState(state);
  }

  doThat(): void {
    console.log("OtherState doing that");
    // Optionally transition to another state
  }
}

class MyContext {
  private state: MyState;

  constructor(state: MyState) {
    this.state = state;
    this.changeState(state);
  }

  changeState(state: MyState): void {
    this.state = state;
    this.state.setContext(this);
    console.log(`Context: State changed to ${this.state.constructor.name}`);
  }

  doThis(): void {
    this.state.doThis();
  }

  doThat(): void {
    this.state.doThat();
  }
}

const initialState = new ConcreteState();
const myContext = new MyContext(initialState);

console.log("Initial Actions:");
myContext.doThis();
myContext.doThat();

console.log("\nSubsequent Actions:");
myContext.doThis();
myContext.doThat();
