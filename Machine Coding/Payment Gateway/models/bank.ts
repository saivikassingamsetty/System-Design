class Bank {
  id: string;
  name: string;
  requestsCount: number = 0;
  successCount: number = 0;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
