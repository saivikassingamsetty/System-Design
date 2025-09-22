class ClientService {
  clients: Map<string, Client> = new Map();

  getClientById(clientId: string) {
    return this.clients.get(clientId);
  }

  addClient(name: string) {
    let clientId = "C" + Object.keys(this.clients).length;
    let client = new Client(clientId, name);
    this.clients.set(clientId, client);
  }

  removeClient(clientId: string) {
    this.clients.delete(clientId);
  }

  hasClient(clientId: string) {
    return this.clients.has(clientId);
  }

  addPaymode(clientId: string, paymode: Paymode) {
    let client = this.clients.get(clientId);
    client?.paymentModes.add(paymode);
  }
}
