import { VehicleType } from "./vehicle";

export abstract class ParkingSpot {
  isVacant: boolean = true;
  private vehicleNumber: string | null = null;

  occupy(vehicleNumber?: string) {
    this.isVacant = false;
    this.vehicleNumber = vehicleNumber || null;
  }

  vacate() {
    this.isVacant = true;
    this.vehicleNumber = null;
  }

  hasVehicle(vehicleNumber: string): boolean {
    return this.vehicleNumber === vehicleNumber;
  }

  abstract canFitVehicle(type: VehicleType): boolean;
}

class SmallSpot extends ParkingSpot {
  canFitVehicle(type: VehicleType): boolean {
    return type == VehicleType.BIKE;
  }
}

class CompactSpot extends ParkingSpot {
  canFitVehicle(type: VehicleType): boolean {
    return type == VehicleType.CAR;
  }
}

class LargeSpot extends ParkingSpot {
  canFitVehicle(type: VehicleType): boolean {
    return type == VehicleType.TRUCK;
  }
}

export class ParkingSpotFactory {
  createParkingSpot(type: VehicleType): ParkingSpot {
    switch (type) {
      case VehicleType.BIKE:
        return new SmallSpot();
      case VehicleType.CAR:
        return new CompactSpot();
      case VehicleType.TRUCK:
        return new LargeSpot();
    }
  }
}
