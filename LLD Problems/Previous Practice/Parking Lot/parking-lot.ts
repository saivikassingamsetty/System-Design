import { ParkingLevel } from "./parking-level";
import { Vehicle } from "./vehicle";

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
    console.log(`Parking ${vehicle.type} ${vehicle.number}`);
    console.log("Searching for best spot...");
    for (const level of this.levels) {
      if (level.park(vehicle)) {
        return true;
      }
    }

    console.log(`Sorry, no space, come back later`);
    return false;
  }

  unpark(vehicle: Vehicle) {
    console.log(`Releasing ${vehicle.type} ${vehicle.number}`);
    if (vehicle.parkedLevel) {
      return vehicle.parkedLevel.unpark(vehicle);
    }

    return false;
  }
}
