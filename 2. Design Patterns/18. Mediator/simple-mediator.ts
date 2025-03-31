/**
 * The Mediator interface declares a method used by components to notify the
 * mediator about various events. The Mediator may react to these events and
 * pass the execution to other components.
 */
interface Mediator {
  notify(sender: object, event: string): void;
}

/**
 * Concrete Mediators implement cooperative behavior by coordinating several
 * components.
 */
class SimpleMediator implements Mediator {
  private componentA: ComponentA;
  private componentB: ComponentB;

  constructor(cA: ComponentA, cB: ComponentB) {
    this.componentA = cA;
    this.componentA.setMediator(this);
    this.componentB = cB;
    this.componentB.setMediator(this);
  }

  public notify(sender: object, event: string): void {
    switch (event) {
      case "X":
        console.log("Mediator reacts on X and triggers ComponentB actionZ:");
        this.componentB.actionZ();
        break;
      case "Y":
        console.log("Mediator reacts on Y and triggers ComponentA actionX:");
        this.componentA.performAdditionalAction();
        break;
    }
  }
}

/**
 * The Base Component provides the basic functionality of storing a mediator's
 * instance inside component objects.
 */
class BaseComponent {
  protected mediator: Mediator;

  constructor(mediator?: Mediator) {
    this.mediator = mediator!;
  }

  public setMediator(mediator: Mediator): void {
    this.mediator = mediator;
  }
}

/**
 * Concrete Components implement various functionality. They don't depend on
 * other components. They also don't depend on any concrete mediator classes.
 */
class ComponentA extends BaseComponent {
  public actionX(): void {
    console.log("Component A performs action X.");
    this.mediator.notify(this, "X");
  }

  public performAdditionalAction(): void {
    console.log("Component A performs an additional action.");
  }
}

class ComponentB extends BaseComponent {
  public actionY(): void {
    console.log("Component B performs action Y.");
    this.mediator.notify(this, "Y");
  }

  public actionZ(): void {
    console.log("Component B performs action Z.");
  }
}

/**
 * The client code.
 */
const componentA = new ComponentA();
const componentB = new ComponentB();
const mediator = new SimpleMediator(componentA, componentB);

console.log("Client triggers action X.");
componentA.actionX();

console.log("");
console.log("Client triggers action Y.");
componentB.actionY();
