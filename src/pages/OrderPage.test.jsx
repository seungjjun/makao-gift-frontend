import { fireEvent, render, screen } from '@testing-library/react';

import OrderPage from './OrderPage';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

let userId = '';
let option = '';
let manufacturer = '';
let productNumber = 0;
let productName = '당진 사과';
let price = 0;

const order = jest.fn();

jest.mock('../hooks/useOrderStore', () => () => ({
  userId,
  order,
  option,
  manufacturer,
  productNumber,
  productName,
  price,
}));

const context = describe;

describe('OrderPage', () => {
  context('주문 페이지를 렌더링 했을 경우', () => {
    beforeEach(() => {
      userId = 'jel1y';
      option = '1 + 1 행사';
      manufacturer = '사과수피아';
      productName = '당진 사과';
      productNumber = 1;
      price = 15000;

      render(<OrderPage />);
    });

    it('주문할 상품의 정보를 확인할 수 있다', () => {
      screen.getByText('1 + 1 행사');
      screen.getByText('사과수피아');
      screen.getByText('구매수량: 1');
      screen.getByText('당진 사과');
      screen.getByText('총 상품금액: 15,000원');
    });

    it('주문 받을 분의 정보를 입력할 수 있다.', () => {
      fireEvent.change(screen.getByLabelText('받는 분 성함*'), {
        target: { value: '노승준' },
      });

      fireEvent.change(screen.getByLabelText('받는 분 주소*'), {
        target: { value: '성북구 정릉동' },
      });

      fireEvent.change(screen.getByLabelText('받는 분께 보내는 메세지'), {
        target: { value: '사과 받아랏' },
      });

      fireEvent.submit(screen.getByText('선물하기'));
    });
  });
});
