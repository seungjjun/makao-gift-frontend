import ProductStore from '../../src/stores/ProductStore';

const context = describe;

describe('ProductStore', () => {
  let productStore;

  beforeEach(() => {
    productStore = new ProductStore();
  });

  describe('products', () => {
    it('상품 정보을 불러옴', async () => {
      await productStore.fetchProducts(1);

      expect(productStore.products.length).toBe(8);
    });

    it('상품 세부 정보를 불러옴', async () => {
      await productStore.fetchProduct(1);

      const { product } = productStore;

      expect(product.name).toBe('젤리세트');
    });
  });

  describe('pagination', () => {
    it('1페이지 상품 8개를 불러옴', async () => {
      await productStore.fetchProducts(1);

      const { products } = productStore;

      expect(productStore.pageNumber).toBe(1);
      expect(products.length).toBe(8);
    });

    it('2페이지 상품 2개를 불러옴', async () => {
      await productStore.fetchProducts(2);

      const { products } = productStore;

      expect(productStore.pageNumber).toBe(2);
      expect(products.length).toBe(2);
    });
  });

  describe('changeProductNumber', () => {
    context('when click "+" button', () => {
      it('+를 눌러 10000원 금액의 상품의 수량을 2로 변경', async () => {
        await productStore.fetchProduct(1);

        expect(productStore.productPrice).toBe(10000);

        expect(productStore.productNumber).toBe(1);

        productStore.changeProductNumber('plusBlakImage', 10000);

        expect(productStore.productNumber).toBe(2);

        expect(productStore.productPrice).toBe(20000);
      });
    });

    context('when click "-" button', () => {
      it('-를 눌러 상품의 수량을 변경', async () => {
        await productStore.fetchProduct(1);

        expect(productStore.productPrice).toBe(10000);

        productStore.changeProductNumber('plusBlakImage', 10000);
        expect(productStore.productNumber).toBe(2);

        productStore.changeProductNumber('minusBlackImage', 10000);

        expect(productStore.productNumber).toBe(1);
      });

      it('상품의 수량이 1일때는 -를 눌러도 수량 변경이 없음', async () => {
        await productStore.fetchProduct(1);

        expect(productStore.productPrice).toBe(10000);

        expect(productStore.productNumber).toBe(1);

        productStore.changeProductNumber('minusGrayImage', 10000);

        expect(productStore.productNumber).toBe(1);
      });
    });
  });
});
