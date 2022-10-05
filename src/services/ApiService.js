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
}

export const apiService = new ApiService();
