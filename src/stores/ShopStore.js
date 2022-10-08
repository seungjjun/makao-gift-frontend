import { apiService } from '../services/ApiService';

import Store from './Store';

export default class ShopStore extends Store {
  constructor() {
    super();

    this.id = '';
    this.name = '';
    this.amount = 0;

    this.transactions = [];

    this.transaction = {};

    this.pageNumber = 0;

    this.pageNumbers = [];

    this.transactionNumber = 1;
  }

  async login({ id, password }) {
    try {
      const { accessToken, name, amount } = await apiService.postLogin({
        id, password,
      });

      this.name = name;
      this.amount = amount;

      return accessToken;
    } catch (e) {
      return '';
    }
  }

  async fetchUser() {
    const { name, amount } = await apiService.fetchUser();

    this.name = name;
    this.amount = amount;

    this.publish();
  }

  async fetchTransaction(id) {
    this.transaction = await apiService.fetchTransaction(id);

    this.publish();
  }

  async fetchTransactions(number) {
    const { transactions, transactionNumber } = await apiService.fetchTransactions(number);

    this.transactions = transactions;
    this.transactionNumber = transactionNumber;

    this.pageNumber = Math.floor(transactionNumber / 8);

    if (transactionNumber % 8 > 0) {
      this.pageNumber += 1;
    }

    this.publish();
  }

  async pagination() {
    this.pageNumbers = [...Array(this.pageNumber)]
      .map((value, index) => index + 1);

    this.publish();
  }
}

export const shopStore = new ShopStore();
