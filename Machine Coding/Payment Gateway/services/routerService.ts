class RouterService {
  routingStrategy: RoutingStrategy | null = null;
  bankService: BankService = new BankService();

  setRoutingStrategy(routingStrategy: RoutingStrategy) {
    this.routingStrategy = routingStrategy;
  }

  selectBank(banks: string[]) {
    return this.routingStrategy?.selectBank(banks);
  }

  showDistribution() {
    let banks = this.bankService.getAllBanks();
    let totalRequests = 0;
    for (let bank of banks) {
      totalRequests += this.bankService.getTraffic(bank);
    }

    for (let bank of banks) {
      console.log(
        bank,
        (100 * this.bankService.getTraffic(bank)) / totalRequests
      );
    }
  }
}
