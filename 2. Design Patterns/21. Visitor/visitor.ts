interface Visitor {
  visitDot(dot: MyDot): void;
  visitRect(rect: MyRect): void;
  visitComplexFigure(complex: MyComplexFigure): void;
}

class XMLExportVisitor implements Visitor {
  visitDot(dot: MyDot): void {
    console.log(`Exporting Dot as XML with position (${dot.x}, ${dot.y})`);
  }

  visitRect(rect: MyRect): void {
    console.log(
      `Exporting Rectangle as XML with position (${rect.x}, ${rect.y})`
    );
  }

  visitComplexFigure(complex: MyComplexFigure): void {
    console.log("Exporting ComplexFigure as XML with multiple parts:");
    complex.figures.forEach((figure) => figure.accept(this));
  }
}

interface Figure {
  move(x: number, y: number): void;
  draw(x: number, y: number): void;
  accept(v: Visitor): void;
}

class MyDot implements Figure {
  x: number = 0;
  y: number = 0;

  move(x: number, y: number): void {
    this.x = x; // Adjusted to set absolute new position
    this.y = y;
    console.log(`Dot moved to (${this.x}, ${this.y})`);
  }

  draw(x: number, y: number): void {
    this.x = x;
    this.y = y;
    console.log(`Dot drawn at (${this.x}, ${this.y})`);
  }

  accept(v: Visitor): void {
    v.visitDot(this);
  }
}

class MyRect implements Figure {
  x: number = 0;
  y: number = 0;

  move(x: number, y: number): void {
    this.x = x; // Adjusted to set absolute new position
    this.y = y;
    console.log(`Rectangle moved to (${this.x}, ${this.y})`);
  }

  draw(x: number, y: number): void {
    this.x = x;
    this.y = y;
    console.log(`Rectangle drawn at (${this.x}, ${this.y})`);
  }

  accept(v: Visitor): void {
    v.visitRect(this);
  }
}

class MyComplexFigure implements Figure {
  figures: Figure[] = [];

  move(x: number, y: number): void {
    console.log(`ComplexFigure moving components by (${x}, ${y})`);
    this.figures.forEach((figure) => figure.move(x, y)); // It might be relative, adjust as needed.
  }

  draw(x: number, y: number): void {
    console.log(`Drawing ComplexFigure at base position (${x}, ${y})`);
    this.figures.forEach((figure) => figure.draw(x, y));
  }

  accept(v: Visitor): void {
    console.log("Accepting visitor for ComplexFigure");
    this.figures.forEach((figure) => {
      figure.accept(v);
    });
    v.visitComplexFigure(this);
  }

  addFigure(figure: Figure): void {
    this.figures.push(figure);
  }
}

// Example usage:

const mydot = new MyDot();
const rect = new MyRect();
const complexFigure = new MyComplexFigure();

complexFigure.addFigure(mydot);
complexFigure.addFigure(rect);

const xmlVisitor = new XMLExportVisitor();

console.log("\nMoving and Drawing:");

mydot.move(5, 5);
rect.move(10, 10);

complexFigure.move(20, 20);

console.log("\nExporting to XML:");
mydot.accept(xmlVisitor);
rect.accept(xmlVisitor);
complexFigure.accept(xmlVisitor);
