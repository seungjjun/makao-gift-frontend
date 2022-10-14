import {
  render, screen,
} from '@testing-library/react';

import ProductDetail from '../../src/components/ProductDetail';

const context = describe;

describe('ProductDetail', () => {
  context('상품 세부 정보를 확인할 경우', () => {
    it('올바르게 정보를 확인할 수 있다.', () => {
      const accessToken = 'AccessToken';

      const productStore = jest.fn();
      const orderStore = jest.fn();
      const navigate = jest.fn();

      const product = {
        id: 1, manufacturer: '킹왕짱젤리', name: '젤리세트', option: '대왕젤리2개포함한', price: 10_000,
      };

      render((
        <ProductDetail
          accessToken={accessToken}
          productStore={productStore}
          orderStore={orderStore}
          product={product}
          navigate={navigate}
        />
      ));
      screen.getAllByText('10,000원');
      screen.getByText(/대왕젤리2개포함한/);
      screen.getByText(/킹왕짱젤리/);
    });
  });
});
