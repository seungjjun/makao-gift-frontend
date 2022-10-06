import { apiService } from '../services/ApiService';

import Store from './Store';

export default class OrderStore extends Store {
  constructor() {
    super();

    this.amounts = {
      jel1y: 50_000,
    };

    this.sender = '';
    this.receiver = '';
    this.address = '';
    this.message = '';

    this.manufacturer = '';
    this.productName = '';
    this.option = '';
    this.productNumber = 1;
    this.price = 0;
  }

  amount(id) {
    return this.amounts[id];
  }

  async order(sender, receiver, address, message) {
    this.sender = sender;
    this.receiver = receiver;
    this.address = address;
    this.message = message;

    const { manufacturer } = this;
    const { productName } = this;
    const { option } = this;
    const { productNumber } = this;
    const { price } = this;

    await apiService.order(
      {
        sender,
        receiver,
        address,
        message,
        productNumber,
        price,
        manufacturer,
        productName,
        option,
      },
    );

    this.publish();
  }

  productInformation(manufacturer, name, option, productNumber, price) {
    this.manufacturer = manufacturer;
    this.productName = name;
    this.option = option;
    this.productNumber = productNumber;
    this.price = price;

    this.publish();
  }
}

export const orderStore = new OrderStore();
