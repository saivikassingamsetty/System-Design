"use strict";
class NormalHouseBuilder {
    constructor() {
        this.cost = 0;
    }
    buyLand() {
        console.log("Bought affordable land in a village");
        this.properyArea = 1000;
        this.cost += 10000;
    }
    buildDraft() {
        console.log("Built Draft of the House");
        this.cost += 1000;
    }
    buildDoors(doors) {
        this.doors = doors;
        console.log(`Built ${doors} doors`);
        this.cost += 100;
    }
    buildRoofTop() {
        console.log(`Built RoofTop`);
        this.cost += 1000;
    }
    buildWindows(windows) {
        this.windows = windows;
        console.log(`Built RoofTop`);
        this.cost += 1000;
    }
    makeWaterWorks() { }
    makeElectricalWorks() { }
    buildSwimmingPool() { }
    buildGarden() { }
    getHouse() {
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
class LuxuryHouseBuilder {
    constructor() {
        this.cost = 0;
        this.doors = 0;
        this.windows = 0;
        this.propertyArea = 0;
        this.hasPool = false;
        this.hasGarden = false;
    }
    buyLand() {
        console.log("Bought premium land in a city");
        this.propertyArea = 2000;
        this.cost += 50000;
    }
    buildDraft() {
        console.log("Built detailed draft of the Luxury House");
        this.cost += 5000;
    }
    buildDoors(doors) {
        this.doors = doors;
        console.log(`Built ${doors} high-quality doors`);
        this.cost += 500 * doors;
    }
    buildRoofTop() {
        console.log(`Built premium RoofTop`);
        this.cost += 5000;
    }
    buildWindows(windows) {
        this.windows = windows;
        console.log(`Built ${windows} large windows`);
        this.cost += 1000 * windows;
    }
    makeWaterWorks() {
        console.log("Installed premium water system");
        this.cost += 10000;
    }
    makeElectricalWorks() {
        console.log("Installed smart electrical system");
        this.cost += 15000;
    }
    buildSwimmingPool() {
        console.log("Built a swimming pool");
        this.hasPool = true;
        this.cost += 20000;
    }
    buildGarden() {
        console.log("Landscaped a beautiful garden");
        this.hasGarden = true;
        this.cost += 10000;
    }
    getHouse() {
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
    makeNormalHouse(builder) {
        builder.buyLand();
        builder.buildDraft();
        builder.buildDoors(4);
        builder.buildWindows(2);
    }
    makeLuxuryHouse(builder) {
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
const normalBuilder = new NormalHouseBuilder();
const luxuryBuilder = new LuxuryHouseBuilder();
const director = new Director();
director.makeNormalHouse(normalBuilder);
const normalHouse = normalBuilder.getHouse();
console.log("Here is your Normal House", normalHouse);
director.makeLuxuryHouse(luxuryBuilder);
const luxuryHouse = luxuryBuilder.getHouse();
console.log("Here is your Luxury House", luxuryHouse);
