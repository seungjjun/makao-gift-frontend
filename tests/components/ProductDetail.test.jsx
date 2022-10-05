import { render, screen, waitFor } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import ProductDetail from '../../src/components/ProductDetail';

test('ProductDetail', async () => {
  render((
    <MemoryRouter>
      <ProductDetail />
    </MemoryRouter>
  ));
  waitFor(() => {
    screen.getByText('총 상품금액');
  });
});
