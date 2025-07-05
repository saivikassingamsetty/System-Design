import { parkingLot } from "./ParkingLot";
import { ParkingLevel } from "./ParkingLevel";
import { ParkingSpotFactory } from "./ParkingSpot";
import { VehicleType } from "./vehicle";
import { Car } from "./Car";
import { Bike } from "./Bike";
import { Truck } from "./Truck";
import {
  VehicleBasedFeeStrategy,
  FlatRateFeeStrategy,
} from "./ParkingFeeStrategy";

export class ParkingLotDemo {
  static runDemo() {
    console.log("🚗 Parking Lot System Demo");
    console.log("=".repeat(40));

    // Set fee strategy
    parkingLot.setFeeStructure(new VehicleBasedFeeStrategy());

    // Create parking levels
    const level1 = new ParkingLevel();
    level1.levelId = 1;

    const level2 = new ParkingLevel();
    level2.levelId = 2;

    // Create parking spots using factory
    const spotFactory = new ParkingSpotFactory();

    // Add spots to level 1
    for (let i = 0; i < 5; i++) {
      level1.addSpot(spotFactory.createParkingSpot(VehicleType.BIKE));
    }
    for (let i = 0; i < 10; i++) {
      level1.addSpot(spotFactory.createParkingSpot(VehicleType.CAR));
    }

    // Add spots to level 2
    for (let i = 0; i < 3; i++) {
      level2.addSpot(spotFactory.createParkingSpot(VehicleType.TRUCK));
    }
    for (let i = 0; i < 8; i++) {
      level2.addSpot(spotFactory.createParkingSpot(VehicleType.CAR));
    }

    // Add levels to parking lot
    parkingLot.addLevel(level1);
    parkingLot.addLevel(level2);

    // Create vehicles
    const bike1 = new Bike("B001");
    const bike2 = new Bike("B002");
    const car1 = new Car("C001");
    const car2 = new Car("C002");
    const truck1 = new Truck("T001");

    console.log("\n📊 Initial availability:");
    parkingLot.displayAvailability();

    console.log("\n🚗 Parking vehicles...");
    parkingLot.parkVehicle(bike1);
    parkingLot.parkVehicle(car1);
    parkingLot.parkVehicle(truck1);
    parkingLot.parkVehicle(bike2);
    parkingLot.parkVehicle(car2);

    console.log("\n📊 After parking:");
    parkingLot.displayAvailability();

    // Simulate some time passing
    console.log("\n⏰ Simulating time passing...");
    setTimeout(() => {
      console.log("\n🚗 Unparking vehicles...");
      parkingLot.unparkVehicle(bike1);
      parkingLot.unparkVehicle(car1);

      console.log("\n📊 After unparking:");
      parkingLot.displayAvailability();
    }, 2000);
  }
}

// Run the demo
ParkingLotDemo.runDemo();
