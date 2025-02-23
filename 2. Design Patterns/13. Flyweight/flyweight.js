"use strict";
// Flyweight: TreeType represents the shared state
class TreeType {
    constructor(name, color, texture) {
        this.name = name;
        this.color = color;
        this.texture = texture;
    }
    // Draws the tree to the canvas at x and y (extrinsic state)
    draw(canvas, x, y) {
        console.log(`Drawing a ${this.color} ${this.name} tree at (${x}, ${y}) with texture ${this.texture}`);
    }
}
// Flyweight Factory: TreeFactory manages TreeType instances
class TreeFactory {
    static getTreeType(name, color, texture) {
        const key = `${name},${color},${texture}`;
        if (!TreeFactory.treeTypes.has(key)) {
            const newType = new TreeType(name, color, texture);
            TreeFactory.treeTypes.set(key, newType);
        }
        return TreeFactory.treeTypes.get(key);
    }
}
// Storing already created TreeTypes
TreeFactory.treeTypes = new Map();
// Context: Tree stores the extrinsic state associated with each tree instance
class Tree {
    constructor(x, y, treeType) {
        this.x = x;
        this.y = y;
        this.treeType = treeType;
    }
    // Passing the extrinsic state/unique state to flyweight
    draw(canvas) {
        this.treeType.draw(canvas, this.x, this.y);
    }
}
// Client: Forest is responsible for managing trees and their drawing
class Forest {
    plantTree(x, y, name, color, texture) {
        const type = TreeFactory.getTreeType(name, color, texture);
        const tree = new Tree(x, y, type);
        Forest.trees.add(tree);
    }
    draw(canvas) {
        for (let tree of Forest.trees) {
            tree.draw(canvas);
        }
    }
}
Forest.trees = new Set();
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
