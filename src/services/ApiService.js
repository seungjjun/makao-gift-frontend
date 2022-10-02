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
}

export const apiService = new ApiService();
