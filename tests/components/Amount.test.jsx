import { render, screen, waitFor } from '@testing-library/react';

import { orderStore } from '../../src/stores/OrderStore';

import Amount from '../../src/components/Amount';

jest.mock('../../src/stores/OrderStore');

test('Amount', async () => {
  await orderStore.fetchUser();

  render(<Amount />);

  waitFor(() => {
    screen.getByText('내 잔액: 50,000원');
  });
});
