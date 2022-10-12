import { render, screen } from '@testing-library/react';

import { orderStore } from '../../src/stores/OrderStore';

import Amount from '../../src/components/Amount';

test('Amount', async () => {
  await orderStore.fetchUser();

  render(<Amount orderStore={orderStore} />);

  screen.getByText('내 잔액: 50,000원');
});
