import { ParkingLevel } from "./parking-level";
import { ParkingSpot } from "./parking-spot";

abstract class Vehicle {
  number: string = "";
  type: string = "bike";
  parkedSpot: ParkingSpot | null = null;
  parkedLevel: ParkingLevel | null = null;

  constructor(number: string) {
    this.number = number;
  }
}

enum VehicleType {
  Car = "car",
  Bike = "bike",
  Truck = "truck",
}

class Bike extends Vehicle {
  type = VehicleType.Bike;
}

class Car extends Vehicle {
  type = VehicleType.Car;
}

class Truck extends Vehicle {
  type = VehicleType.Truck;
}

export { Vehicle, VehicleType, Car, Bike, Truck };
