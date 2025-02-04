interface Graphic {
  move(x: number, y: number): void;
  draw(): void;
}

class Dot implements Graphic {
  protected x: number;
  protected y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  move(x: number, y: number): void {
    this.x += x;
    this.y += y;
  }

  draw(): void {
    console.log(`A Dot has been drawn at (${this.x}, ${this.y})`);
  }
}

class CircleLeaf extends Dot {
  private radius: number;

  constructor(x: number, y: number, radius: number) {
    super(x, y);
    this.radius = radius;
  }

  draw(): void {
    console.log(
      `A Circle with radius ${this.radius} has been drawn at (${this.x}, ${this.y})`
    );
  }
}

class CompoundGraphic implements Graphic {
  private children: Graphic[];

  constructor(children: Graphic[] = []) {
    this.children = children;
  }

  addChild(child: Graphic): void {
    this.children.push(child);
  }

  removeChild(child: Graphic): void {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }

  move(x: number, y: number): void {
    this.children.forEach((child) => child.move(x, y));
  }

  draw(): void {
    this.children.forEach((child) => child.draw());
  }
}

// Client code demonstrating usage:
let dot = new Dot(1, 2);
let circle = new CircleLeaf(5, 5, 5);

let compound = new CompoundGraphic();
compound.addChild(dot);
compound.addChild(circle);
compound.move(10, 10);
compound.draw();

let largeCompound = new CompoundGraphic();
largeCompound.addChild(dot);
largeCompound.addChild(circle);
largeCompound.addChild(compound);
largeCompound.move(50, 50);
largeCompound.draw();
