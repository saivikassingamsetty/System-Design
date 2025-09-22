class PaymodeService {
  clientService = new ClientService();

  listSupportedPaymodes(clientId: string) {
    let client = clientService.getClientById(clientId);
    console.log(client?.paymentModes);
  }

  addSupportForPaymode(clientId: string, paymode: Paymode) {
    let client = clientService.getClientById(clientId);
    client?.paymentModes.add(paymode);
  }

  removePaymode(clientId: string, paymode: Paymode) {
    let client = clientService.getClientById(clientId);
    client?.paymentModes.delete(paymode);
  }
}
