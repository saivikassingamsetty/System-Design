// This is just my trail to do in an another way

import { ParkingLevel } from "./parking-level";
import { ParkingLot } from "./parking-lot";
import { ParkingSpot } from "./parking-spot";
import { VehicleType } from "./vehicle";

class Vehicle {
  parkingLot: ParkingLot;
  number: string;
  type: VehicleType = VehicleType.Bike;
  parkedSpot: ParkingSpot | null = null;
  parkedLevel: ParkingLevel | null = null;

  constructor(number: string, parkingLot: ParkingLot) {
    this.number = number;
    this.parkingLot = parkingLot;
  }

  park() {
    if (this.parkingLot) {
      const success = this.parkingLot.park(this);
      if (success) {
        console.log(`${this.number} parked successfully.`);
      } else {
        console.log(`No available spot for ${this.number}.`);
      }
    }
  }

  leave() {
    if (this.parkingLot && this.parkedLevel) {
      const success = this.parkingLot.unpark(this);
      if (success) {
        console.log(`${this.number} left the parking lot.`);
      } else {
        console.log(`Error removing ${this.number} from the parking lot.`);
      }
    }
  }
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

class VehicleFactory {
  static parkingLot: ParkingLot | null = null;

  static createVehicle(type: string, number: string) {
    switch (type) {
      case VehicleType.Bike:
        return new Bike(number, parkingLot);
      case VehicleType.Car:
        return new Car(number, parkingLot);
      case VehicleType.Truck:
        return new Truck(number, parkingLot);
    }

    return new Bike(number, parkingLot);
  }
}

//Client
const parkingLot = new ParkingLot();
VehicleFactory.parkingLot = parkingLot;
const bike1 = VehicleFactory.createVehicle(VehicleType.Bike, "HS12");
const bike2 = VehicleFactory.createVehicle(VehicleType.Bike, "HU76");
const car1 = VehicleFactory.createVehicle(VehicleType.Car, "IJ87");
const car2 = VehicleFactory.createVehicle(VehicleType.Car, "KI90");
const truck1 = VehicleFactory.createVehicle(VehicleType.Truck, "MN78");

bike1.park();
bike2.park();
car1.park();
truck1.park();
bike2.leave();
