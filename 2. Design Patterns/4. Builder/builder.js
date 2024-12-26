var NormalHouseBuilder = /** @class */ (function () {
  function NormalHouseBuilder() {
    this.cost = 0;
  }
  NormalHouseBuilder.prototype.buyLand = function () {
    console.log("Bought affordable land in a village");
    this.properyArea = 1000;
    this.cost += 10000;
  };
  NormalHouseBuilder.prototype.buildDraft = function () {
    console.log("Built Draft of the House");
    this.cost += 1000;
  };
  NormalHouseBuilder.prototype.buildDoors = function (doors) {
    this.doors = doors;
    console.log("Built ".concat(doors, " doors"));
    this.cost += 100;
  };
  NormalHouseBuilder.prototype.buildRoofTop = function () {
    console.log("Built RoofTop");
    this.cost += 1000;
  };
  NormalHouseBuilder.prototype.buildWindows = function (windows) {
    this.windows = windows;
    console.log("Built RoofTop");
    this.cost += 1000;
  };
  NormalHouseBuilder.prototype.makeWaterWorks = function () {};
  NormalHouseBuilder.prototype.makeElectricalWorks = function () {};
  NormalHouseBuilder.prototype.buildSwimmingPool = function () {};
  NormalHouseBuilder.prototype.buildGarden = function () {};
  NormalHouseBuilder.prototype.getHouse = function () {
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
  };
  return NormalHouseBuilder;
})();
// Add a new LuxuryHouseBuilder
var LuxuryHouseBuilder = /** @class */ (function () {
  function LuxuryHouseBuilder() {
    this.cost = 0;
    this.doors = 0;
    this.windows = 0;
    this.propertyArea = 0;
    this.hasPool = false;
    this.hasGarden = false;
  }
  LuxuryHouseBuilder.prototype.buyLand = function () {
    console.log("Bought premium land in a city");
    this.propertyArea = 2000;
    this.cost += 50000;
  };
  LuxuryHouseBuilder.prototype.buildDraft = function () {
    console.log("Built detailed draft of the Luxury House");
    this.cost += 5000;
  };
  LuxuryHouseBuilder.prototype.buildDoors = function (doors) {
    this.doors = doors;
    console.log("Built ".concat(doors, " high-quality doors"));
    this.cost += 500 * doors;
  };
  LuxuryHouseBuilder.prototype.buildRoofTop = function () {
    console.log("Built premium RoofTop");
    this.cost += 5000;
  };
  LuxuryHouseBuilder.prototype.buildWindows = function (windows) {
    this.windows = windows;
    console.log("Built ".concat(windows, " large windows"));
    this.cost += 1000 * windows;
  };
  LuxuryHouseBuilder.prototype.makeWaterWorks = function () {
    console.log("Installed premium water system");
    this.cost += 10000;
  };
  LuxuryHouseBuilder.prototype.makeElectricalWorks = function () {
    console.log("Installed smart electrical system");
    this.cost += 15000;
  };
  LuxuryHouseBuilder.prototype.buildSwimmingPool = function () {
    console.log("Built a swimming pool");
    this.hasPool = true;
    this.cost += 20000;
  };
  LuxuryHouseBuilder.prototype.buildGarden = function () {
    console.log("Landscaped a beautiful garden");
    this.hasGarden = true;
    this.cost += 10000;
  };
  LuxuryHouseBuilder.prototype.getHouse = function () {
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
  };
  return LuxuryHouseBuilder;
})();
var Director = /** @class */ (function () {
  function Director() {}
  Director.prototype.makeNormalHouse = function (builder) {
    builder.buyLand();
    builder.buildDraft();
    builder.buildDoors(4);
    builder.buildWindows(2);
  };
  Director.prototype.makeLuxuryHouse = function (builder) {
    builder.buyLand();
    builder.buildDraft();
    builder.buildDoors(6);
    builder.buildWindows(8);
    builder.buildRoofTop();
    builder.makeWaterWorks();
    builder.makeElectricalWorks();
    builder.buildSwimmingPool();
    builder.buildGarden();
  };
  return Director;
})();
// Client Code
var normalBuilder = new NormalHouseBuilder();
var luxuryBuilder = new LuxuryHouseBuilder();
var director = new Director();
director.makeNormalHouse(normalBuilder);
var normalHouse = normalBuilder.getHouse();
console.log("Here is your Normal House", normalHouse);
director.makeLuxuryHouse(luxuryBuilder);
var luxuryHouse = luxuryBuilder.getHouse();
console.log("Here is your Luxury House", luxuryHouse);
