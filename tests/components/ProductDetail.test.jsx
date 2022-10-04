import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductDetail from '../../src/components/ProductDetail';

test('ProductDetail', async () => {
  const product = [
    {
      id: 1, manufacturer: '킹왕짱젤리', name: '젤리세트', option: '대왕젤리2개포함한', price: 10_000,
    },
  ];
  render((
    <MemoryRouter>
      <ProductDetail />
    </MemoryRouter>
  ));

  waitFor(() => {
    screen.getByText('킹왕짱젤리');
  });
});
