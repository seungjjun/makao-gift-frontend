import { render, screen } from '@testing-library/react';

import OrdersDetailPage from './OrdersDetailPage';

let location = jest.fn();

jest.mock('react-router-dom', () => ({
  useLocation() {
    return location;
  },
}));

const fetchTransaction = jest.fn();

let transaction = {};

jest.mock('../hooks/useShopStore', () => () => ({
  fetchTransaction,
  transaction,
}));

const context = describe;

describe('OrderDetailPage', () => {
  context('주문 내역 세부 정보를 확인할 때', () => {
    beforeEach(() => {
      location = {
        pathname: '/orders/1',
        search: '',
        hash: '',
        state: null,
        key: 'default',
      };

      transaction = {
        id: 1,
        receiver: '피카츄',
        manufacturer: '포켓몬 센터',
        productName: '최고급 상처약',
        option: 'HP 200 회복',
        productNumber: 1,
        address: '태초마을',
        price: 3_000,
        message: '초심자 세트',
        purchaseDate: '2022-10-13',
      };
    });

    it('fetchTransaction이 호출된것을 확인할 수 있다.', () => {
      render(<OrdersDetailPage />);

      expect(fetchTransaction).toBeCalled();
    });

    it('주문 내역의 세부 정보를 확인할 수 있다.', () => {
      render(<OrdersDetailPage />);

      screen.getByText('포켓몬 센터');
      screen.getByText(/최고급 상처약/);
      screen.getByText(/HP 200 회복/);
      screen.getByText('태초마을');
      screen.getByText(/총 상품금액/);
      screen.getByText(/3,000원/);
    });
  });
});
