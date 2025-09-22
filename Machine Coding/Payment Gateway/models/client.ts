class Client {
  clientId: string;
  name: string;
  paymentModes: Set<Paymode> = new Set();

  constructor(clientId: string, name: string) {
    this.clientId = clientId;
    this.name = name;
  }
}
