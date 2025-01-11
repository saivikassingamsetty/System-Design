class RoundPeg {
  radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  getRadius(): number {
    return this.radius;
  }
}

class RoundHole {
  radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  getRadius(): number {
    return this.radius;
  }

  fit(peg: RoundPeg): void {
    console.log(this.radius >= peg.getRadius() ? "Fits": "Unfit");
  }
}

class SquarePeg {
  width: number;

  constructor(width: number) {
    this.width = width;
  }

  getWidth(): number {
    return this.width;
  }
}

class SquarePegAdapter extends RoundPeg {
  peg: SquarePeg;

  constructor(peg: SquarePeg) {
    super(0);
    this.peg = peg;
  }

  getRadius(): number {
    return (this.peg.getWidth() * Math.sqrt(2)) / 2;
  }
}

const hole = new RoundHole(5);
const rpeg = new RoundPeg(5);
hole.fit(rpeg); //true

const speg_small = new SquarePeg(5);
const speg_large = new SquarePeg(10);
// hole.fit(speg_small) //wont compatible

const speg_small_adapter = new SquarePegAdapter(speg_small);
const speg_large_adapter = new SquarePegAdapter(speg_large);
hole.fit(speg_small_adapter); //true
hole.fit(speg_large_adapter); //false
