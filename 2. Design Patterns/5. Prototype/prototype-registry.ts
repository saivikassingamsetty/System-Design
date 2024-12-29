// Prototype
abstract class Prototype {
    color: string;

    constructor(color: string) {
        this.color = color;
    }

    abstract clone(): this;
    public getColor(): string {
        return this.color;
    };
}

//Concrete Prototype
class Circle extends Prototype {
    position: number[];
    radius: number;
    color: string;

    constructor(position: number[], radius: number, color: string) {
        super(color);
        this.position = position;
        this.radius = radius;
        this.color = color;
    }

    public clone(): this {
        const clone = Object.create(this);
        clone.position = Object.create(this.position);
        clone.radius = this.radius;
        clone.color = this.color;

        return clone;
    }
}

class Rectangle extends Prototype {
    position: number[];
    length: number;
    breadth: number;
    color: string;

    constructor(position: number[], length: number, breadth: number, color: string) {
        super(color);
        this.position = position;
        this.length = length;
        this.breadth = breadth;
        this.color = color;
    }

    public clone(): this {
        const clone = Object.create(this);
        clone.position = Object.create(this.position);
        clone.length = this.length;
        clone.breadth = this.breadth;
        clone.color = this.color;

        return clone;
    }
}

//Prototype Registry
class PrototypeRegistry {
    public prototypes: Map<string, Prototype> = new Map();

    public addPrototype(name: string, prototype: Prototype): void {
        this.prototypes.set(name, prototype);
    }

    public getPrototype(name: string): Prototype | undefined {
        return this.prototypes.get(name);
    }

    public getPrototypeByColor(color: string): Prototype | undefined {
        for (let [name, prototype] of this.prototypes) {
            if (prototype.getColor() == color) {
                return prototype;
            }
        }
    }
}


// Client Code
const myCircle = new Circle([0,0], 5, 'red');
myCircle.color = 'blue';


const registry = new PrototypeRegistry();
registry.addPrototype('blueCircle', myCircle);

console.log(myCircle.getColor());

const blueCircle = registry.getPrototypeByColor('blue') as Prototype;
console.log(blueCircle);