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

      waitFor(() => {
        expect(productStore.products.length).toBe(9);
      });
    });
  });

  describe('pagination', () => {
    it('상품을 불러와 2페이지가 생김', async () => {
      await productStore.fetchProducts();

      waitFor(async () => {
        expect(productStore.pageNumber).toBe(2);
        await productStore.pagination();
      });

      waitFor(() => {
        expect(productStore.pageNumbers).toBe(2);
      });
    });
  });

  describe('changeProductNumber', () => {
    it('4000원 금액의 상품의 수량을 3으로 변경', async () => {
      await productStore.changeProductNumber('+', 4000);

      waitFor(async () => {
        expect(productStore.productNumber).toBe(3);
        expect(productStore.productPrice).toBe(12000);
      });
    });
  });
});
