import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import OrderList from '../../src/components/OrderList';

import { shopStore } from '../../src/stores/ShopStore';

test('OrderList', async () => {
  await shopStore.fetchTransactions(1);

  render((
    <MemoryRouter>
      <OrderList />
    </MemoryRouter>
  ));

  screen.getByText('내가 주문한 내역입니다');
  screen.getByText('빙그레');
  screen.getByText('To.노승준');
});
