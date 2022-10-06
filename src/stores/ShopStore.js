import { apiService } from '../services/ApiService';

import Store from './Store';

export default class ShopStore extends Store {
  constructor() {
    super();

    this.id = '';
    this.name = '';
    this.amount = 0;
    this.transactions = [];
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

  async fetchTransactions() {
    this.transactions = await apiService.fetchTransactions();
    this.publish();
  }
}

export const shopStore = new ShopStore();
