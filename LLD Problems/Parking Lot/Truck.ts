import { Vehicle, VehicleType } from "./vehicle";

export class Truck extends Vehicle {
  constructor(number: string) {
    super(VehicleType.TRUCK, number);
  }
}
