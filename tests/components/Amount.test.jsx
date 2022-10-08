import { render, screen, waitFor } from '@testing-library/react';

import { shopStore } from '../../src/stores/ShopStore';

import Amount from '../../src/components/Amount';

jest.mock('../../src/stores/ShopStore');

test('Amount', async () => {
  await shopStore.fetchUser();

  render(<Amount />);

  waitFor(() => {
    screen.getByText('내 잔액: 50,000원');
  });
});
