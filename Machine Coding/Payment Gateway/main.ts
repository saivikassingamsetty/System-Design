// CLIENT
class PaymentGateway {
  routerService = new RouterService();
  bankService = new BankService();

  makePayment(paymentDetails: Record<Paymode, string>) {
    let bank = this.routerService.selectBank(bankService.getAllBanks());
    if (bank) {
      bankService.makeTransaction(bank);
    } else {
      console.error("Payment Failure");
    }
  }
}

// TEST CASE
let paymentGateway = new PaymentGateway();
let clientService = new ClientService();
let paymodeService = new PaymodeService();
let routerService = new RouterService();
let bankService = new BankService();

clientService.addClient("Flipkart");
clientService.addClient("Zomato");
clientService.hasClient("Zomato"); // True
clientService.removeClient("Zomato");

paymodeService.listSupportedPaymodes("Flipkart");
paymodeService.addSupportForPaymode("Flipkart", Paymode.UPI);

routerService.showDistribution();

paymentGateway.makePayment({Paymode.UPI, 'vikas@axisb'});
