import {
  fireEvent, render, screen,
} from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import OrderList from '../../src/components/OrderList';

const context = describe;

describe('OrderList', () => {
  context('when transaction exist', () => {
    it('check transactions', () => {
      const transactions = [
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

      const pageNumbers = [...Array(8)]
        .map((value, index) => index + 1);

      const shopStore = jest.fn();
      const navigate = jest.fn();

      render((
        <MemoryRouter>
          <OrderList
            shopStore={shopStore}
            navigate={navigate}
            transactions={transactions}
            pageNumbers={pageNumbers}
          />
        </MemoryRouter>
      ));

      screen.getByText('내가 주문한 내역입니다');
      screen.getByText('빙그레');
      screen.getByText('To.노승준');

      fireEvent.click(screen.getByAltText('product'));

      expect(navigate).toBeCalledWith('/orders/1');
    });
  });

  context('when transaction not exist', () => {
    it('can`t check transactions', () => {
      const transactions = [];
      const pageNumbers = [];

      const shopStore = jest.fn();
      const navigate = jest.fn();

      render((
        <MemoryRouter>
          <OrderList
            shopStore={shopStore}
            navigate={navigate}
            transactions={transactions}
            pageNumbers={pageNumbers}
          />
        </MemoryRouter>
      ));

      screen.getByText('내가 주문한 내역이 없습니다');
    });
  });
});
