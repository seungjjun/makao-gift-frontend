import { render, screen } from '@testing-library/react';
import { shopStore } from '../stores/ShopStore';
import Amount from './Amount';

test('Amount', async () => {
  await shopStore.fetchUser();

  render(<Amount />);

  screen.getByText('내 잔액: 50000원');
});
