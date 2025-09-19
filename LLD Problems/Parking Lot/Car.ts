import { Vehicle, VehicleType } from "./vehicle";

export class Car extends Vehicle {
  constructor(number: string) {
    super(VehicleType.CAR, number);
  }
}
