import { render, screen, waitFor } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import OrderList from '../../src/components/OrderList';

let transactions = [];
let pageNumbers = [];
let pageNumber = {};

jest.mock('../../src/hooks/useShopStore', () => () => ({
  transactions,
  pageNumbers,
  pageNumber,
  fetchTransactions: jest.fn(),
  pagination: jest.fn(),
}));

test('OrderList', async () => {
  transactions = [
    {
      id: 1,
      receiver: '노승준',
      manufacturer: '빙그레',
      productName: '요맘때',
      option: '수억마리의 유산균이 싱싱하게 살아있는',
      productNumber: 1,
      address: '서울 종로',
      price: 1_000,
      message: '선물도착',
      purchaseDate: '2022-10-06',
    },
  ];

  pageNumber = 8;

  pageNumbers = [...Array(8)]
    .map((value, index) => index + 1);

  render((
    <MemoryRouter>
      <OrderList />
    </MemoryRouter>
  ));

  await waitFor(() => {
    screen.getByText('내가 주문한 내역입니다');
    screen.getByText('빙그레');
    screen.getByText('To.노승준');
  });
});
