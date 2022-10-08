import { waitFor } from '@testing-library/react';

import ProductStore from '../../src/stores/ProductStore';

const context = describe;

describe('ProductStore', () => {
  let productStore;

  beforeEach(() => {
    productStore = new ProductStore();
  });

  describe('products', () => {
    it('상품 정보을 불러옴', async () => {
      await productStore.fetchProducts();

      await waitFor(() => {
        expect(productStore.products.length).toBe(8);
      });
    });

    it('상품 세부 정보를 불러옴', async () => {
      await productStore.fetchProduct(1);

      const { product } = productStore;

      expect(product.name).toBe('젤리세트');
    });
  });

  describe('pagination', () => {
    it('상품을 불러와 2페이지가 생김', async () => {
      await productStore.fetchProducts(2);

      expect(productStore.pageNumber).toBe(2);
      await productStore.pagination();
    });
  });

  describe('changeProductNumber', () => {
    it('4000원 금액의 상품의 수량을 2으로 변경', async () => {
      await productStore.fetchProduct(1);

      waitFor(() => {
        expect(productStore.productPrice).toBe(4000);
      });

      expect(productStore.productNumber).toBe(1);

      productStore.changeProductNumber('+', 4000);

      expect(productStore.productNumber).toBe(2);

      waitFor(() => {
        expect(productStore.productPrice).toBe(8000);
      });
    });
  });
});
