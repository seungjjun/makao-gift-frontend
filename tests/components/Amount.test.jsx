import { render, screen } from '@testing-library/react';
import { shopStore } from '../../src/stores/ShopStore';
import Amount from '../../src/components/Amount';

test('Amount', async () => {
  await shopStore.fetchUser();

  render(<Amount />);

  screen.getByText('내 잔액: 50,000원');
});
