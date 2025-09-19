import { ParkingLevel } from "./parking-level";
import { ParkingLot } from "./parking-lot";
import { ParkingSpot } from "./parking-spot";
import { VehicleType } from "./vehicle";
import { VehicleFactory } from "./vehicle-factory";

const bike1 = VehicleFactory.createVehicle(VehicleType.Bike, "HS12");
const bike2 = VehicleFactory.createVehicle(VehicleType.Bike, "HU76");
const car1 = VehicleFactory.createVehicle(VehicleType.Car, "IJ87");
const car2 = VehicleFactory.createVehicle(VehicleType.Car, "KI90");
const truck1 = VehicleFactory.createVehicle(VehicleType.Truck, "MN78");

const parkinglot = ParkingLot.getInstance();
const level0 = new ParkingLevel();
level0.addParkingSpot(new ParkingSpot(VehicleType.Bike));
level0.addParkingSpot(new ParkingSpot(VehicleType.Bike));
level0.addParkingSpot(new ParkingSpot(VehicleType.Bike));
parkinglot.addParkingLevel(level0);

const level1 = new ParkingLevel();
level1.addParkingSpot(new ParkingSpot(VehicleType.Car));
level1.addParkingSpot(new ParkingSpot(VehicleType.Car));
level1.addParkingSpot(new ParkingSpot(VehicleType.Bike));
parkinglot.addParkingLevel(level1);

const level2 = new ParkingLevel();
level2.addParkingSpot(new ParkingSpot(VehicleType.Car));
level2.addParkingSpot(new ParkingSpot(VehicleType.Truck));
level2.addParkingSpot(new ParkingSpot(VehicleType.Truck));
parkinglot.addParkingLevel(level2);

parkinglot.park(bike1);
parkinglot.park(car1);
parkinglot.park(truck1);
parkinglot.unpark(bike1);
