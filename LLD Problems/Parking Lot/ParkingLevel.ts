import { ParkingSpot, ParkingSpotFactory } from "./ParkingSpot";
import { ParkingTicket } from "./ParkingTicket";
import { Vehicle, VehicleType } from "./vehicle";

export class ParkingLevel {
  levelId: number = 0;
  parkingSpots: ParkingSpot[] = [];

  addSpot(spot: ParkingSpot) {
    this.parkingSpots.push(spot);
  }

  park(vehicle: Vehicle): ParkingTicket | null {
    for (let spot of this.parkingSpots) {
      if (spot.canFitVehicle(vehicle.getVehicleType()) && spot.isVacant) {
        spot.occupy(vehicle.getVehicleNumer());
        const ticket = new ParkingTicket(vehicle);
        ticket.parkedAt = this;
        ticket.setSpot(spot);
        return ticket;
      }
    }
    return null;
  }

  unpark(vehicle: Vehicle): boolean {
    for (let spot of this.parkingSpots) {
      if (!spot.isVacant && spot.hasVehicle(vehicle.getVehicleNumer())) {
        spot.vacate();
        return true;
      }
    }
    return false;
  }

  getAvailableSpots(): { bikes: number; cars: number; trucks: number } {
    let bikeSpots = 0;
    let carSpots = 0;
    let truckSpots = 0;

    for (let spot of this.parkingSpots) {
      if (spot.isVacant) {
        if (spot.canFitVehicle(VehicleType.BIKE)) bikeSpots++;
        else if (spot.canFitVehicle(VehicleType.CAR)) carSpots++;
        else if (spot.canFitVehicle(VehicleType.TRUCK)) truckSpots++;
      }
    }

    return { bikes: bikeSpots, cars: carSpots, trucks: truckSpots };
  }
}
