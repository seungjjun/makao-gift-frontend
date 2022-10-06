import { render, screen } from '@testing-library/react';

import Transactions from '../../src/components/Transactions';

import { shopStore } from '../../src/stores/ShopStore';

test('Transactions', async () => {
  await shopStore.fetchTransactions();

  render(<Transactions />);

  screen.getByText('내가 주문한 내역입니다');

  screen.getByText('빙그레');
  screen.getByText('To.노승준');
});
