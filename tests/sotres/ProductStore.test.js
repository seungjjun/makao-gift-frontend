import ProductStore from '../../src/stores/ProductStore';

const context = describe;

describe('ProductStore', () => {
  let productStore;

  beforeEach(() => {
    productStore = new ProductStore();
  });

  describe('products', () => {
    it('상품 정보를 1개 불러옴', async () => {
      await productStore.fetchProducts();

      expect(productStore.products.length).toBe(1);
    });
  });
});
