import { fireEvent, render, screen } from '@testing-library/react';

import OrdersPage from './OrdersPage';

let transactions = [];
let pageNumbers = [];

const fetchTransactions = jest.fn();
const pagination = jest.fn();

jest.mock('../hooks/useShopStore', () => () => ({
  transactions,
  pageNumbers,
  fetchTransactions,
  pagination,
}));

const navigate = jest.fn();

let location = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
  useLocation() {
    return location;
  },
}));

const context = describe;

describe('OrdersPage', () => {
  context('9개의 거래내역이 존재할 경우', () => {
    beforeEach(() => {
      location = {
        pathname: '/orders?page=1',
        search: '',
        hash: '',
        state: null,
        key: 'default',
      };

      transactions = [
        {
          id: 1, receiver: '리자드', sender: '꼬부기', manufacturer: '지프', productName: '퍼플리스 집업', option: '2022 F/W', productNumber: 1, address: '서울 종로', price: 25_000, message: '추워진다', createdAt: '2022-10-13',
        },
        {
          id: 2, receiver: '이상해씨', sender: '파이리', manufacturer: '브렌슨', productName: '무지 긴팔티', option: '1+1', productNumber: 1, address: '서울 동대문', price: 15_000, message: '선물도착', createdAt: '2022-10-13',
        },
        {
          id: 3, receiver: '거북왕', sender: '푸린', manufacturer: '노스페이스', productName: '빅샷', option: '수납공간 넉넉', productNumber: 1, address: '서울 서대문', price: 30_000, message: '선물도착', createdAt: '2022-10-13',
        },
        {
          id: 4, receiver: '단데기', sender: '주뱃', manufacturer: '트래블', productName: '블랙 후드티', option: '10/28 예약배송', productNumber: 1, address: '서울 성북구', price: 20_000, message: '선물도착', createdAt: '2022-10-14',
        },
        {
          id: 5, receiver: '버터플', sender: '뚜벅쵸', manufacturer: '빙그레', productName: '요맘때', option: '수억마리의 유산균이 싱싱하게 살아있는', productNumber: 1, address: '서울 종로', price: 1_000, message: '선물도착', createdAt: '2022-10-06',
        },
        {
          id: 6, receiver: '구구', sender: '나옹', manufacturer: '빙그레', productName: '요맘때', option: '수억마리의 유산균이 싱싱하게 살아있는', productNumber: 1, address: '서울 종로', price: 1_000, message: '선물도착', createdAt: '2022-10-06',
        },
        {
          id: 7, receiver: '피카츄', sender: '디그다', manufacturer: '빙그레', productName: '요맘때', option: '수억마리의 유산균이 싱싱하게 살아있는', productNumber: 1, address: '서울 종로', price: 1_000, message: '선물도착', createdAt: '2022-10-06',
        },
        {
          id: 8, receiver: '삐삐', sender: '수륙챙이', manufacturer: '빙그레', productName: '요맘때', option: '수억마리의 유산균이 싱싱하게 살아있는', productNumber: 1, address: '서울 종로', price: 1_000, message: '선물도착', createdAt: '2022-10-06',
        },
        {
          id: 9, receiver: '마자용', sender: '디그다', manufacturer: '빙그레', productName: '요맘때', option: '수억마리의 유산균이 싱싱하게 살아있는', productNumber: 1, address: '서울 종로', price: 1_000, message: '선물도착', createdAt: '2022-10-06',
        },
      ];
      pageNumbers = [1, 2];
    });

    it('fetchTransactions이 호출된것을 확인할 수 있다', () => {
      render(<OrdersPage />);

      expect(fetchTransactions).toBeCalled();
    });

    it('8개의 거래내역을 초과해 페이지가 2개가 생긴것을 확인할 수 있다.', () => {
      render(<OrdersPage />);

      expect(pagination).toBeCalled();

      screen.getByText('2');
    });

    it('선물한 내역을 확인할 수 있다.', () => {
      render(<OrdersPage />);

      screen.getByText('To.리자드');
      screen.getByText('지프');
      screen.getByText('퍼플리스 집업');
    });

    it('4번 아이디를 가진 거래 내역을 클릭해 navigate가 호출된것을 확인할 수 있다.', () => {
      render(<OrdersPage />);

      screen.getByText('To.단데기');

      fireEvent.click(screen.getByText('To.단데기'));

      expect(navigate).toBeCalledWith('/orders/4');
    });

    it('2페이지를 클릭해 2번페이지로 이동하는 navigate가 호출된것을 확인할 수 있다.', () => {
      render(<OrdersPage />);

      screen.getByText('2');

      fireEvent.click(screen.getByText('2'));

      expect(navigate).toBeCalledWith('/orders?page=2');
    });
  });

  context('거래내역이 존재하지 않을 경우', () => {
    beforeEach(() => {
      location = {
        pathname: '/orders?page=1',
        search: '',
        hash: '',
        state: null,
        key: 'default',
      };

      transactions = [];
      pageNumbers = [1];
    });

    it('내가 주문한 내역이 없다는 메세지를 볼 수 있다', () => {
      render(<OrdersPage />);

      screen.getByText('내가 주문한 내역이 없습니다');
    });
  });
});
