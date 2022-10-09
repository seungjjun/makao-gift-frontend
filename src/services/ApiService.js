/* eslint-disable class-methods-use-this */
import axios from 'axios';

const baseUrl = 'http://localhost:8000';

export default class ApiService {
  constructor() {
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  async postLogin({ userId, password }) {
    const url = `${baseUrl}/login`;
    const { data } = await axios.post(url, { userId, password });
    return {
      accessToken: data.accessToken,
      name: data.name,
      amount: data.amount,
    };
  }

  async register({
    name, userId, password, confirmPassword,
  }) {
    const url = `${baseUrl}/signup`;
    const { data } = await axios.post(url, {
      name, userId, password, confirmPassword,
    });
  }

  async fetchUser() {
    const url = `${baseUrl}`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return {
      name: data.name,
      amount: data.amount,
    };
  }

  async fetchProduct(id) {
    const url = `${baseUrl}/products/${id}`;
    const { data } = await axios.get(url);

    return data;
  }

  async fetchProducts(pageNumber) {
    const url = `${baseUrl}/products`;
    const { data } = await axios.get(url, {
      params: {
        page: pageNumber,
      },
    });

    const { products, productNumber } = data;
    return {
      products,
      productNumber,
    };
  }

  async fetchTransaction(id) {
    const url = `${baseUrl}/orders/${id}`;
    const { data } = await axios.get(url);

    return data;
  }

  async fetchTransactions(pageNumber) {
    const url = `${baseUrl}/orders`;
    const { data } = await axios.get(url, {
      params: {
        page: pageNumber,
      },
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    const { transactions, transactionNumber } = data;

    return {
      transactions,
      transactionNumber,
    };
  }

  async order({
    userId, receiver, address, message, productNumber,
    price, manufacturer, productName, option, image,
  }) {
    const url = `${baseUrl}/order`;
    await axios.post(url, {
      userId,
      receiver,
      productNumber,
      price,
      address,
      message,
      manufacturer,
      productName,
      option,
      image,
    });
  }
}

export const apiService = new ApiService();
