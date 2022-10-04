import Store from './Store';

export default class OrderStore extends Store {
  constructor() {
    super();

    this.amounts = {
      jel1y: 50_000,
    };
  }

  amount(id) {
    return this.amounts[id];
  }

  order(from, to, product, price) {
    this.amounts[from] -= price;
  }
}
