import { apiService } from '../services/ApiService';

import Store from './Store';

export default class ProductStore extends Store {
  constructor() {
    super();

    this.products = [];
    this.pageNumber = 0;
    this.pageNumbers = [];
  }

  async fetchProducts(number) {
    this.products = [];
    const { products, productNumber } = await apiService.fetchProducts(number);

    this.products = products;

    this.pageNumber = Math.floor(productNumber / 8);

    if (productNumber % 8 > 0) {
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

export const productStore = new ProductStore();
