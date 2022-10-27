import { fireEvent, render, screen } from '@testing-library/react';

import ProductDetailPage from './ProductDetailPage';

let location = jest.fn();
const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useLocation() {
    return location;
  },
  useNavigate() {
    return navigate;
  },
}));

const fetchProduct = jest.fn();
const changeProductNumber = jest.fn();

let product = {};

jest.mock('../hooks/useProductStore', () => () => ({
  fetchProduct,
  product,
  changeProductNumber,
}));

const orderState = '';
const productInformation = jest.fn();
const changeOrderState = jest.fn();

jest.mock('../hooks/useOrderStore', () => () => ({
  orderState,
  productInformation,
  changeOrderState,
}));

let accessToken = '';

jest.mock('usehooks-ts', () => ({
  useLocalStorage() {
    return accessToken;
  },
}));

const context = describe;

describe('ProductDetailPage', () => {
  context('상품의 세부 정보를 확인할 때 (accessToken이 있을 경우)', () => {
    beforeEach(() => {
      location = {
        pathname: '/products/1',
        search: '',
        hash: '',
        state: null,
        key: 'default',
      };

      product = {
        manufacturer: '사과수피아',
        name: '당진 사과',
        option: '아주 마시써',
        productNumber: 2,
        price: 20_000,
        productPrice: 40_000,
      };

      accessToken = 'ACCESSTOKEN';
    });

    context('상품 세부 페이지가 처음 렌더링 되었을 때', () => {
      it('상품의 세부 정보를 fetch 해오는 것을 확인할 수 있다.', () => {
        render(<ProductDetailPage />);

        expect(fetchProduct).toBeCalled();
      });

      it('상품의 세부 정보를 확인할 수 있다.', () => {
        render(<ProductDetailPage />);

        screen.getByText('사과수피아');
        screen.getByText('당진 사과');
        screen.getByText('아주 마시써');
        screen.getByText('20,000원');
      });
    });

    context('+ 버튼을 눌렀을 경우', () => {
      it('상품의 수량을 변경시키는 함수가 호출된것을 확인할 수 있다.', () => {
        render(<ProductDetailPage />);

        fireEvent.click(screen.getByAltText('plusBlakImage'));

        expect(changeProductNumber).toBeCalled();
      });
    });

    context('활성화된 - 버튼을 눌렀을 경우', () => {
      it('상품의 수량을 변경시키는 함수가 호출된것을 확인할 수 있다.', () => {
        render(<ProductDetailPage />);

        fireEvent.click(screen.getByAltText('minusBlackImage'));

        expect(changeProductNumber).toBeCalled();
      });
    });

    context('access token이 존재할 경우', () => {
      it('선물하기 버튼을 클릭했을때 주문페이지로 이동하는 navigate가 호출되는것을 확인할 수 있다.', () => {
        render(<ProductDetailPage />);

        fireEvent.click(screen.getByText('선물하기'));

        expect(navigate).toBeCalledWith('/order');
      });
    });
  });

  context('accessToken이 존재하지 않을 경우', () => {
    beforeEach(() => {
      accessToken = '';
    });

    it('선물하기 버튼을 클릭했을때 로그인 페이지로 이동하는 navigate가 호출되는것을 확인할 수 있다.', () => {
      render(<ProductDetailPage />);

      fireEvent.click(screen.getByText('선물하기'));

      expect(navigate).toBeCalledWith('/login');
    });
  });
});
