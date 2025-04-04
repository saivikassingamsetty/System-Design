export class ParkingSpot {
  static idCounter = 0;
  id: number = 0;
  isOccupied: boolean = false;
  type: string;

  constructor(type: string) {
    this.id = ParkingSpot.idCounter++;
    this.type = type;
  }
}
