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

    this.loginState = '';

    this.registrationState = '';

    this.errorMessage = '';
  }

  async login({ userId, password }) {
    try {
      const { accessToken, name, amount } = await apiService.postLogin({
        userId, password,
      });

      this.name = name;
      this.amount = amount;

      return accessToken;
    } catch (e) {
      const { message } = e.response.data;
      this.changeLoginState('fail', { errorMessage: message });
      return '';
    }
  }

  async register({
    name, userId, password, confirmPassword,
  }) {
    try {
      const data = await apiService.register({
        name, userId, password, confirmPassword,
      });
      this.name = data;
    } catch (e) {
      const { message } = e.response.data;
      this.changeRegistrationState('existing', { errorMessage: message });
    }
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

  changeRegistrationState(state, { errorMessage = '' } = {}) {
    this.errorMessage = errorMessage;
    this.registrationState = state;
    this.publish();
  }

  changeLoginState(state, { errorMessage = '' } = {}) {
    this.errorMessage = errorMessage;
    this.loginState = state;
    this.publish();
  }

  get isLoginFail() {
    return this.loginState === 'fail';
  }

  get isExistingUserId() {
    return this.registrationState === 'existing';
  }
}

export const shopStore = new ShopStore();
