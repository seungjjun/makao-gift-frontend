import { apiService } from '../services/ApiService';

export default class ShopStore {
  constructor() {
    this.id = '';
    this.name = '';
    this.amount = 0;
    this.orderList = [];
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
}
