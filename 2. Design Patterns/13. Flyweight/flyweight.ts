// Flyweight: TreeType represents the shared state
class TreeType {
  // Intrinsic state
  name: string;
  color: string;
  texture: string;

  constructor(name: string, color: string, texture: string) {
    this.name = name;
    this.color = color;
    this.texture = texture;
  }

  // Draws the tree to the canvas at x and y (extrinsic state)
  draw(canvas: any, x: number, y: number) {
    console.log(
      `Drawing a ${this.color} ${this.name} tree at (${x}, ${y}) with texture ${this.texture}`
    );
  }
}

// Flyweight Factory: TreeFactory manages TreeType instances
class TreeFactory {
  // Storing already created TreeTypes
  static treeTypes: Map<string, TreeType> = new Map();

  static getTreeType(name: string, color: string, texture: string) {
    const key = `${name},${color},${texture}`;

    if (!TreeFactory.treeTypes.has(key)) {
      const newType = new TreeType(name, color, texture);
      TreeFactory.treeTypes.set(key, newType);
    }

    return TreeFactory.treeTypes.get(key) as TreeType;
  }
}

// Context: Tree stores the extrinsic state associated with each tree instance
class Tree {
  x: number;
  y: number;
  treeType: TreeType;

  constructor(x: number, y: number, treeType: TreeType) {
    this.x = x;
    this.y = y;
    this.treeType = treeType;
  }

  // Passing the extrinsic state/unique state to flyweight
  draw(canvas: any) {
    this.treeType.draw(canvas, this.x, this.y);
  }
}

// Client: Forest is responsible for managing trees and their drawing
class Forest {
  static trees: Set<Tree> = new Set();

  plantTree(
    x: number,
    y: number,
    name: string,
    color: string,
    texture: string
  ) {
    const type = TreeFactory.getTreeType(name, color, texture);
    const tree = new Tree(x, y, type);
    Forest.trees.add(tree);
  }

  draw(canvas: any) {
    for (let tree of Forest.trees) {
      tree.draw(canvas);
    }
  }
}

// Example usage:

// Simulating a canvas object
const canvas = {}; // Placeholder for a real canvas drawing implementation

const forest = new Forest();
forest.plantTree(10, 20, "Oak", "green", "rough");
forest.plantTree(15, 25, "Pine", "dark green", "smooth");
forest.plantTree(30, 40, "Oak", "green", "rough"); // Use existing TreeType
forest.plantTree(50, 60, "Pine", "dark green", "smooth"); // Use existing TreeType

forest.draw(canvas);

// Expected output:
// Drawing a green Oak tree at (10, 20) with texture rough
// Drawing a dark green Pine tree at (15, 25) with texture smooth
// Drawing a green Oak tree at (30, 40) with texture rough
// Drawing a dark green Pine tree at (50, 60) with texture smooth
