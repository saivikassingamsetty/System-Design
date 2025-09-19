import { ParkingSpot } from "./parking-spot";
import { Vehicle } from "./vehicle";

export class ParkingLevel {
  spots: ParkingSpot[] = [];

  addParkingSpot(spot: ParkingSpot) {
    this.spots.push(spot);
  }

  setParkingSpots(spots: ParkingSpot[]) {
    this.spots = spots;
  }

  park(vehicle: Vehicle): boolean {
    const vacantSpot = this.spots.find(
      (spot: ParkingSpot) => spot.type == vehicle.type && !spot.isOccupied
    );

    if (vacantSpot) {
      vehicle.parkedLevel = this;
      vehicle.parkedSpot = vacantSpot;
      vacantSpot.isOccupied = true;
      console.log(`${vehicle.type} ${vehicle.number} Parked!`);
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
      console.log(`Byee byee ${vehicle.type} ${vehicle.number}, come again!`);
      return true;
    }

    return false;
  }
}
