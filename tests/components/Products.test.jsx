import { fireEvent, render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import Products from '../../src/components/Products';

test('Products', async () => {
  const navigate = jest.fn();
  const productStore = jest.fn();

  const pageNumbers = [1, 2, 3, 4, 5];

  const products = [
    {
      id: 1, manufacturer: '예일', name: 'ARCH HOODIE GRAY', price: 30000,
    },
  ];

  render((
    <MemoryRouter>
      <Products
        navigate={navigate}
        productStore={productStore}
        pageNumbers={pageNumbers}
        products={products}
      />
    </MemoryRouter>
  ));

  screen.getByText('인기선물을 한 자리에 모았어요');

  screen.getByText('예일');
  screen.getByText('ARCH HOODIE GRAY');
  screen.getByText('30,000원');

  screen.getByText('1');
  screen.getByText('5');

  fireEvent.click(screen.getByText('예일'));

  expect(navigate).toBeCalled();
});
