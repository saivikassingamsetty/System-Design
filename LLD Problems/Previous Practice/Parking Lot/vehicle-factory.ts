import { Bike, Car, Truck, VehicleType } from "./vehicle";

export class VehicleFactory {
  static createVehicle(type: string, number: string) {
    switch (type) {
      case VehicleType.Bike:
        return new Bike(number);
      case VehicleType.Car:
        return new Car(number);
      case VehicleType.Truck:
        return new Truck(number);
    }

    return new Bike(number);
  }
}
