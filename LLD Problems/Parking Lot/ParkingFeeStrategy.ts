import { ParkingTicket } from "./ParkingTicket";
import { VehicleType } from "./vehicle";

export abstract class ParkingFeeStrategy {
  getHours(parkingTicket: ParkingTicket): number {
    const milliseconds = Date.now() - parkingTicket.getEntryTime();
    const hours = Math.ceil(milliseconds / (1000 * 60 * 60));
    return Math.max(1, hours);
  }

  abstract getFare(parkingTicket: ParkingTicket): number;
}

export class FlatRateFeeStrategy extends ParkingFeeStrategy {
  getFare(parkingTicket: ParkingTicket): number {
    return this.getHours(parkingTicket) * 50;
  }
}

export class VehicleBasedFeeStrategy extends ParkingFeeStrategy {
  getFare(parkingTicket: ParkingTicket): number {
    switch (parkingTicket.getVehicleType()) {
      case VehicleType.BIKE:
        return 20 * this.getHours(parkingTicket);
      case VehicleType.CAR:
        return 50 * this.getHours(parkingTicket);
      case VehicleType.TRUCK:
        return 100 * this.getHours(parkingTicket);
    }
  }
}
