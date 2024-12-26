interface House {
  doors: number;
  windows: number;
  propertyArea: number;
  isWaterWorksDone: boolean;
  isElectricalWorksDone: boolean;
  totalCost: number;
  hasSwimmingPool: boolean;
  hasGarden: boolean;
}

interface Builder {
  buyLand(): void;
  buildDraft(): void;
  buildDoors(doors: number): void;
  buildRoofTop(): void;
  buildWindows(windows: number): void;
  makeWaterWorks(): void;
  makeElectricalWorks(): void;
  buildSwimmingPool(): void;
  buildGarden(): void;
  getHouse(): House;
}

class NormalHouseBuilder implements Builder {
  cost: number = 0;
  doors: number;
  windows: number;
  properyArea: number;

  buyLand(): void {
    console.log("Bought affordable land in a village");
    this.properyArea = 1000;
    this.cost += 10000;
  }

  buildDraft(): void {
    console.log("Built Draft of the House");
    this.cost += 1000;
  }

  buildDoors(doors: number): void {
    this.doors = doors;
    console.log(`Built ${doors} doors`);
    this.cost += 100;
  }

  buildRoofTop(): void {
    console.log(`Built RoofTop`);
    this.cost += 1000;
  }

  buildWindows(windows: number): void {
    this.windows = windows;
    console.log(`Built RoofTop`);
    this.cost += 1000;
  }

  makeWaterWorks(): void {}
  makeElectricalWorks(): void {}
  buildSwimmingPool(): void {}
  buildGarden(): void {}

  getHouse(): House {
    return {
      doors: this.doors,
      windows: this.windows,
      propertyArea: this.properyArea,
      isWaterWorksDone: false,
      isElectricalWorksDone: false,
      totalCost: this.cost,
      hasSwimmingPool: false,
      hasGarden: false,
    };
  }
}

// Add a new LuxuryHouseBuilder
class LuxuryHouseBuilder implements Builder {
  private cost: number = 0;
  private doors: number = 0;
  private windows: number = 0;
  private propertyArea: number = 0;
  private hasPool: boolean = false;
  private hasGarden: boolean = false;

  buyLand(): void {
    console.log("Bought premium land in a city");
    this.propertyArea = 2000;
    this.cost += 50000;
  }

  buildDraft(): void {
    console.log("Built detailed draft of the Luxury House");
    this.cost += 5000;
  }

  buildDoors(doors: number): void {
    this.doors = doors;
    console.log(`Built ${doors} high-quality doors`);
    this.cost += 500 * doors;
  }

  buildRoofTop(): void {
    console.log(`Built premium RoofTop`);
    this.cost += 5000;
  }

  buildWindows(windows: number): void {
    this.windows = windows;
    console.log(`Built ${windows} large windows`);
    this.cost += 1000 * windows;
  }

  makeWaterWorks(): void {
    console.log("Installed premium water system");
    this.cost += 10000;
  }

  makeElectricalWorks(): void {
    console.log("Installed smart electrical system");
    this.cost += 15000;
  }

  buildSwimmingPool(): void {
    console.log("Built a swimming pool");
    this.hasPool = true;
    this.cost += 20000;
  }

  buildGarden(): void {
    console.log("Landscaped a beautiful garden");
    this.hasGarden = true;
    this.cost += 10000;
  }

  getHouse(): House {
    return {
      doors: this.doors,
      windows: this.windows,
      propertyArea: this.propertyArea,
      isWaterWorksDone: true,
      isElectricalWorksDone: true,
      totalCost: this.cost,
      hasSwimmingPool: this.hasPool,
      hasGarden: this.hasGarden,
    };
  }
}

class Director {
  makeNormalHouse(builder: Builder) {
    builder.buyLand();
    builder.buildDraft();
    builder.buildDoors(4);
    builder.buildWindows(2);
  }

  makeLuxuryHouse(builder: Builder) {
    builder.buyLand();
    builder.buildDraft();
    builder.buildDoors(6);
    builder.buildWindows(8);
    builder.buildRoofTop();
    builder.makeWaterWorks();
    builder.makeElectricalWorks();
    builder.buildSwimmingPool();
    builder.buildGarden();
  }
}

// Client Code
const normalBuilder: Builder = new NormalHouseBuilder();
const luxuryBuilder: Builder = new LuxuryHouseBuilder();
const director = new Director();

director.makeNormalHouse(normalBuilder);
const normalHouse: House = normalBuilder.getHouse();
console.log("Here is your Normal House", normalHouse);

director.makeLuxuryHouse(luxuryBuilder);
const luxuryHouse: House = luxuryBuilder.getHouse();
console.log("Here is your Luxury House", luxuryHouse);
