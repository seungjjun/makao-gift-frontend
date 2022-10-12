import {
  render, screen, waitFor,
} from '@testing-library/react';

import ProductDetail from '../../src/components/ProductDetail';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(() => ({
    pathname: '/products/1',
    search: '',
    hash: '',
    state: null,
    key: 'default',
  })),

  useNavigate: jest.fn(),
}));

jest.mock('../../src/services/ApiService', () => ({
  apiService: {
    async fetchProduct() {
      return {
        id: 1,
        manufacturer: '킹왕짱젤리',
        name: '젤리세트',
        option: '대왕젤리2개포함한',
        price: 10_000,
      };
    },
  },
}));

test('ProductDetail', async () => {
  render((
    <ProductDetail />
  ));

  await waitFor(() => {
    screen.getAllByText('10,000원');
    screen.getByText(/대왕젤리2개포함한/);
    screen.getByText(/킹왕짱젤리/);
  });
});
