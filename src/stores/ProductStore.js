import { apiService } from '../services/ApiService';

import Store from './Store';

export default class ProductStore extends Store {
  constructor() {
    super();

    this.id = '';
    this.manufacturer = '';
    this.name = '';
    this.option = '';
    this.price = 0;

    this.products = [];
  }

  async fetchProducts() {
    this.products = await apiService.fetchProducts();

    this.publish();
  }
}

export const productStore = new ProductStore();
