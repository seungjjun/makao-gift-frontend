/* eslint-disable class-methods-use-this */
import axios from 'axios';

const baseUrl = 'http://localhost:8000';

export default class ApiService {
  async postLogin({ id, password }) {
    const url = `${baseUrl}/login`;
    const { data } = await axios.post(url, { id, password });
    return {
      accessToken: data.accessToken,
      name: data.name,
      amount: data.amount,
    };
  }

  async fetchUser() {
    const url = `${baseUrl}/user/me`;
    const { data } = await axios.get(url);
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
    });
    const { transactions, transactionNumber } = data;

    return {
      transactions,
      transactionNumber,
    };
  }

  async order({
    sender, receiver, address, message, productNumber, price, manufacturer, productName, option,
  }) {
    const url = `${baseUrl}/order`;
    const { data } = await axios.post(url, {
      sender,
      receiver,
      productNumber,
      price,
      address,
      message,
      manufacturer,
      productName,
      option,
    });
    return {
      price: data.price,
    };
  }
}

export const apiService = new ApiService();
