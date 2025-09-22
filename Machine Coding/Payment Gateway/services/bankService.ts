class BankService {
  banks: Map<string, Bank> = new Map();

  addBank(name: string) {
    let id = "B" + Object.keys(this.banks).length;
    let bank = new Bank(id, name);
    this.banks.set(id, bank);
  }

  removeBank(bankId: string) {
    this.banks.delete(bankId);
  }

  getAllBanks(): string[] {
    return [...this.banks.keys()];
  }

  makeTransaction(bankId: string) {
    let bank = this.banks.get(bankId);
    if (bank) {
      bank.requestsCount++;
      let isSuccess = Math.random() < 0.5;
      if (isSuccess) {
        bank.successCount++;
      }
    } else {
      console.error("Bank Id not found");
    }
  }

  getSucessRatio(bankId: string): number {
    let bank = this.banks.get(bankId);
    if (bank) {
      return bank.requestsCount ? bank.successCount / bank.requestsCount : 0;
    } else {
      console.warn("Bank Id not found");
      return 0;
    }
  }

  getTraffic(bankId: string) {
    let bank = this.banks.get(bankId);
    if (bank) {
      return bank.requestsCount;
    } else {
      console.warn("Bank Id not found");
      return 0;
    }
  }
}
