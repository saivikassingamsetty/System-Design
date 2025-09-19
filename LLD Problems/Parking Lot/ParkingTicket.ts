import { Vehicle } from "./vehicle";
import { ParkingLevel } from "./ParkingLevel";
import { ParkingSpot } from "./ParkingSpot";

export class ParkingTicket {
  private vehicle: Vehicle;
  private entryTime: number;
  parkedAt: ParkingLevel | null = null;
  private spot: ParkingSpot | null = null;

  constructor(vehicle: Vehicle) {
    this.vehicle = vehicle;
    this.entryTime = Date.now();
  }

  setSpot(spot: ParkingSpot) {
    this.spot = spot;
  }

  getSpot(): ParkingSpot | null {
    return this.spot;
  }

  getEntryTime() {
    return this.entryTime;
  }

  getVehicleType() {
    return this.vehicle.getVehicleType();
  }

  getVehicle() {
    return this.vehicle;
  }
}
