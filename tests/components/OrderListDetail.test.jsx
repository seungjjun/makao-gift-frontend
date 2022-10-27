import { render, screen } from '@testing-library/react';

import OrderListDetail from '../../src/components/OrderListDetail';

const context = describe;

describe('OrderListDetail', () => {
  context('when click order history', () => {
    it('renders transaction detail', () => {
      const transaction = {
        manufacturer: '서울우유',
        productName: '프로바이오틱',
        productNumber: 1,
        price: 1500,
        createdAt: '2022-10-12',
        receiver: '노승준',
        address: '성북구 정릉동',
        message: '테스트',
        image: 'product',
      };
      render(<OrderListDetail
        transaction={transaction}
      />);

      screen.getByText('서울우유');
      screen.getByText('프로바이오틱');
      screen.getByText('노승준');
      screen.getByText('성북구 정릉동');
      screen.getByText('테스트');
    });
  });
});
