class SuccessBasedRouting implements RoutingStrategy {
  bankService = new BankService();

  selectBank(banks: string[]): string {
    let highSuccessBank = null;
    let highSuccessRatio = 0;

    for (let bank of banks) {
      let sucessRatio = this.bankService.getSucessRatio(bank);
      if (sucessRatio > highSuccessRatio) {
        highSuccessRatio = sucessRatio;
        highSuccessBank = bank;
      }
    }

    if (highSuccessBank) {
      return highSuccessBank;
    } else {
      return banks[0];
    }
  }
}
