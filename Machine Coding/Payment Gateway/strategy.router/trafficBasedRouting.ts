class TrafficBasedRouting implements RoutingStrategy {
  bankService = new BankService();
  
  selectBank(banks: string[]): string {
    let lowTrafficBank = null;
    let lowTraffic = Infinity;

    for (let bank of banks) {
      let traffic = this.bankService.getTraffic(bank);
      if (traffic < lowTraffic) {
        lowTraffic = traffic;
        lowTrafficBank = bank;
      }
    }

    if (lowTrafficBank) {
      return lowTrafficBank;
    } else {
      return banks[0];
    }
  }
}
