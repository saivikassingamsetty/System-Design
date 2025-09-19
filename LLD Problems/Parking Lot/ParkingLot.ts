import { ParkingFeeStrategy } from "./ParkingFeeStrategy";
import { ParkingLevel } from "./ParkingLevel";
import { ParkingTicket } from "./ParkingTicket";
import { Vehicle } from "./vehicle";

class ParkingLot {
  private parkingLevels: ParkingLevel[] = [];
  private feeStructure: ParkingFeeStrategy | null = null;
  private parkingLog: Map<string, ParkingTicket> = new Map();
  private static instance: ParkingLot | null = null;

  public static getInstance() {
    if (!ParkingLot.instance) {
      ParkingLot.instance = new ParkingLot();
    }
    return ParkingLot.instance;
  }

  addLevel(level: ParkingLevel) {
    this.parkingLevels.push(level);
  }

  public setFeeStructure(feeStructure: ParkingFeeStrategy) {
    this.feeStructure = feeStructure;
  }

  public parkVehicle(vehicle: Vehicle): boolean {
    for (let level of this.parkingLevels) {
      let ticket = level.park(vehicle);

      if (ticket) {
        this.parkingLog.set(vehicle.getVehicleNumer(), ticket);
        console.log(
          `✅ Vehicle ${vehicle.getVehicleNumer()} parked successfully on level ${level.levelId}`
        );
        return true;
      }
    }

    console.log(
      `❌ Unable to park vehicle ${vehicle.getVehicleNumer()}, Try after some time`
    );
    return false;
  }

  public unparkVehicle(vehicle: Vehicle): boolean {
    let ticket = this.parkingLog.get(vehicle.getVehicleNumer());
    if (ticket) {
      const success = ticket.parkedAt?.unpark(vehicle);
      if (success) {
        this.parkingLog.delete(vehicle.getVehicleNumer());
        let fare = this.feeStructure?.getFare(ticket);
        console.log(
          `✅ Vehicle ${vehicle.getVehicleNumer()} unparked. Please pay: $${fare}`
        );
        return true;
      }
    }
    console.log(
      `❌ Vehicle ${vehicle.getVehicleNumer()} not found in parking log`
    );
    return false;
  }

  public displayAvailability() {
    console.log("\n📊 Parking Availability:");
    console.log("=".repeat(25));

    this.parkingLevels.forEach((level, index) => {
      const availability = level.getAvailableSpots();
      console.log(`Level ${level.levelId}:`);
      console.log(`  🏍️  Bikes: ${availability.bikes} spots`);
      console.log(`  🚗 Cars: ${availability.cars} spots`);
      console.log(`  🚛 Trucks: ${availability.trucks} spots`);
      console.log("");
    });
  }
}

export const parkingLot = ParkingLot.getInstance();
