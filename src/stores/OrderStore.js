import { apiService } from '../services/ApiService';

import Store from './Store';

export default class OrderStore extends Store {
  constructor() {
    super();

    this.userId = '';
    this.name = '';
    this.amount = 0;

    this.receiver = '';
    this.address = '';
    this.message = '';

    this.image = '';
    this.manufacturer = '';
    this.productName = '';
    this.option = '';
    this.productNumber = 1;
    this.price = 0;

    this.orderState = '';

    this.errorMessage = '';
  }

  async fetchUser() {
    const { name, amount } = await apiService.fetchUser();

    this.name = name;
    this.amount = amount;

    this.publish();
  }

  async order(userId, receiver, address, message) {
    try {
      this.userId = userId;
      this.receiver = receiver;
      this.address = address;
      this.message = message;

      const { manufacturer } = this;
      const { productName } = this;
      const { option } = this;
      const { productNumber } = this;
      const { price } = this;
      const { image } = this;

      const data = await apiService.order(
        {
          userId,
          receiver,
          address,
          message,
          productNumber,
          price,
          manufacturer,
          productName,
          option,
          image,
        },
      );

      this.publish();

      this.fetchUser();
      return data;
    } catch (e) {
      const errorMessage = e.response.data;
      this.changeOrderFailState('fail', { errorMessage });
      return '';
    }
  }

  productInformation(image, manufacturer, name, option, productNumber, price) {
    this.image = image;
    this.manufacturer = manufacturer;
    this.productName = name;
    this.option = option;
    this.productNumber = productNumber;
    this.price = price;

    this.publish();
  }

  changeUserId(userId) {
    this.userId = userId;

    this.publish();
  }

  changeOrderState() {
    this.orderState = 'fail';
    this.publish();
  }

  changeOrderFailState(state, { errorMessage = '' } = {}) {
    this.errorMessage = errorMessage;
    this.orderState = state;
    this.publish();
  }

  get isOrderFail() {
    return this.orderState === 'fail';
  }
}

export const orderStore = new OrderStore();
