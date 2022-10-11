import { apiService } from '../services/ApiService';

import Store from './Store';

export default class ProductStore extends Store {
  constructor() {
    super();

    this.product = {};

    this.productPrice = 0;

    this.products = [];

    this.pageNumber = 0;

    this.pageNumbers = [];

    this.productNumber = 1;
  }

  async fetchProduct(id) {
    const product = await apiService.fetchProduct(id);

    this.product = product;
    this.productPrice = product.price;
    this.productNumber = 1;

    this.publish();
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

  changeProductNumber(operator, price) {
    if (operator === 'plusBlakImage') {
      this.productNumber += 1;
      this.productPrice += price;
    }

    if (operator === 'minusBlackImage' && this.productNumber !== 1) {
      this.productNumber -= 1;
      this.productPrice -= price;
    }

    this.publish();
  }
}

export const productStore = new ProductStore();
