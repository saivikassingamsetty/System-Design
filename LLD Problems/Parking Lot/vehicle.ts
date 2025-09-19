export enum VehicleType {
  BIKE = "bike",
  CAR = "car",
  TRUCK = "truck",
}

export abstract class Vehicle {
  private licenseNumber: string;
  private vehicleType: VehicleType;

  constructor(type: VehicleType, number: string) {
    this.vehicleType = type;
    this.licenseNumber = number;
  }

  getVehicleType(): VehicleType {
    return this.vehicleType;
  }

  getVehicleNumer(): string {
    return this.licenseNumber;
  }
}
