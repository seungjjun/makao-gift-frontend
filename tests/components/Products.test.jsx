import { render, screen, waitFor } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import Products from '../../src/components/Products';

test('Products', async () => {
  render((
    <MemoryRouter>
      <Products />
    </MemoryRouter>
  ));

  screen.getByText('인기선물을 한 자리에 모았어요');

  waitFor(() => {
    screen.getByText('제조사: 킹왕짱젤리');
    screen.getByText('상품 이름: 대왕젤리2개포함한 젤리세트');

    screen.getAllByText('10,000원');
  });
});
