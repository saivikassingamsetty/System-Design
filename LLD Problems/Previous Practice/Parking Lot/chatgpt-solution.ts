// ParkingSpot class
export class ParkingSpot {
  static idCounter = 0;
  id: number;
  isOccupied: boolean = false;
  type: string;

  constructor(type: string) {
    this.id = ParkingSpot.idCounter++;
    this.type = type;
  }
}

// // ParkingLevel class
// import { ParkingSpot } from "./parking-spot";
// import { Vehicle } from "./vehicle";

export class ParkingLevel {
  spots: ParkingSpot[] = [];

  addParkingSpot(spot: ParkingSpot) {
    this.spots.push(spot);
  }

  park(vehicle: Vehicle): boolean {
    const vacantSpot = this.spots.find(
      (spot: ParkingSpot) => spot.type === vehicle.type && !spot.isOccupied
    );

    if (vacantSpot) {
      vehicle.parkedLevel = this;
      vehicle.parkedSpot = vacantSpot;
      vacantSpot.isOccupied = true;
      console.log(`${vehicle.type} Parked!`);
      return true;
    }

    return false;
  }

  unpark(vehicle: Vehicle): boolean {
    const parkingSpot = vehicle.parkedSpot;

    if (parkingSpot) {
      vehicle.parkedLevel = null;
      vehicle.parkedSpot = null;
      parkingSpot.isOccupied = false;
      console.log("Byee byee, come again!", vehicle.type);
      return true;
    }

    return false;
  }
}

// ParkingLot class
// import { ParkingLevel } from "./parking-level";
// import { Vehicle } from "./vehicle";

export class ParkingLot {
  protected static instance: ParkingLot | null = null;
  levels: ParkingLevel[] = [];

  static getInstance() {
    if (!this.instance) {
      this.instance = new ParkingLot();
    }

    return this.instance;
  }

  addParkingLevel(level: ParkingLevel) {
    this.levels.push(level);
  }

  park(vehicle: Vehicle): boolean {
    console.log("Searching for best spot...");
    for (const level of this.levels) {
      if (level.park(vehicle)) {
        return true;
      }
    }

    console.log("Sorry, no space, come back later");
    return false;
  }

  unpark(vehicle: Vehicle): boolean {
    if (vehicle.parkedLevel) {
      return vehicle.parkedLevel.unpark(vehicle);
    }

    return false;
  }
}

// Example usage
// import { ParkingLot } from "./parking-lot";
// import { ParkingLevel } from "./parking-level";
// import { ParkingSpot } from "./parking-spot";
import {
  GreenBike,
  BlackBike,
  GreyCar,
  RedCar,
  BlueTruck,
  VehicleType,
  Vehicle,
} from "./vehicle";

const greenBike = new GreenBike();
const blackBike = new BlackBike();
const greyCar = new GreyCar();
const redCar = new RedCar();
const blueTruck = new BlueTruck();

const parkinglot = ParkingLot.getInstance();

const level0 = new ParkingLevel();
level0.addParkingSpot(new ParkingSpot(VehicleType.Bike));
level0.addParkingSpot(new ParkingSpot(VehicleType.Bike));
level0.addParkingSpot(new ParkingSpot(VehicleType.Bike));
parkinglot.addParkingLevel(level0);

const level1 = new ParkingLevel();
level1.addParkingSpot(new ParkingSpot(VehicleType.Car));
level1.addParkingSpot(new ParkingSpot(VehicleType.Car));
level1.addParkingSpot(new ParkingSpot(VehicleType.Bike));
parkinglot.addParkingLevel(level1);

const level2 = new ParkingLevel();
level2.addParkingSpot(new ParkingSpot(VehicleType.Car));
level2.addParkingSpot(new ParkingSpot(VehicleType.Truck));
level2.addParkingSpot(new ParkingSpot(VehicleType.Truck));
parkinglot.addParkingLevel(level2);

parkinglot.park(greenBike);
parkinglot.park(blackBike);
parkinglot.park(blueTruck);
parkinglot.unpark(greenBike);
