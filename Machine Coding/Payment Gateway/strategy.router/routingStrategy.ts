interface RoutingStrategy {
  selectBank(banks: string[]): string;
}
