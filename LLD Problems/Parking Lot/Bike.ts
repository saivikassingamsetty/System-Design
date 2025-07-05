import { Vehicle, VehicleType } from "./vehicle";

export class Bike extends Vehicle {
  constructor(number: string) {
    super(VehicleType.BIKE, number);
  }
}
