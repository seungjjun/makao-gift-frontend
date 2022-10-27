import { fireEvent, render, screen } from '@testing-library/react';

import Productspage from './ProductsPage';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

let pageNumbers = [];
let products = [];
const fetchProducts = jest.fn();
const pagination = jest.fn();

jest.mock('../hooks/useProductStore', () => () => ({
  pageNumbers,
  products,
  fetchProducts,
  pagination,
}));

const context = describe;

describe('ProductsPage', () => {
  context('스토어에 상품이 존재할 경우', () => {
    beforeEach(() => {
      products = [
        {
          id: 1, manufacturer: '킹왕짱젤리', name: '젤리세트', option: '대왕젤리2개포함한', price: 10_000,
        },
        {
          id: 2, manufacturer: '롯데', name: '감자칩', option: '어제 캔 감자로 만든', price: 3_000,
        },
        {
          id: 3, manufacturer: '빙그레', name: '요맘때', option: '수억마리의 유산균이 싱싱하게 살아있는', price: 1_000,
        },
        {
          id: 4, manufacturer: '씨맥스', name: '비타민MAX', option: '한달치 비타민이 들어가있는', price: 10_000,
        },
        {
          id: 5, manufacturer: 'C&C', name: '내츄럴 티슈(50 WIPES)', option: '10년 묵은때도 한번에 닦을 수 있는', price: 5_000,
        },
        {
          id: 6, manufacturer: 'coke', name: '코카콜라', option: '설탕은 1도 안들었지만 매우 달달한', price: 2_500,
        },
        {
          id: 7, manufacturer: '농심', name: '죠스바', option: '진짜 죠스를 먹는듯한 느낌을 가진', price: 1_000,
        },
        {
          id: 8, manufacturer: '애쁠', name: '밀북', option: '한번쓰면 맥북은 생각도 나지 않는 최고의 가성비', price: 50_000,
        },
        {
          id: 9, manufacturer: '샘송', name: '네뷸라워치', option: '시계로 할 수 있는건 다 있다. 상상을 뛰어넘는 워치', price: 30_000,
        },
      ];

      pageNumbers = [1, 2];
    });

    it('화면이 렌더링 될때 fetchProducts가 호출되는것을 확인할 수 있다.', () => {
      render(<Productspage />);

      expect(fetchProducts).toBeCalled();
    });

    it('상품이 9개가 존재하기 때문에 2페이지가 생기는것을 확인할 수 있다.', () => {
      render(<Productspage />);

      expect(pagination).toBeCalled();

      screen.getByText('2');
    });

    it('2페이지를 클릭해 2페이지로 이동하는것을 확인할 수 있다.', () => {
      render(<Productspage />);

      fireEvent.click(screen.getByText('2'));

      expect(navigate).toBeCalledWith('/products?page=2');
    });

    it('상품의 정보를 확인할 수 있다', () => {
      render(<Productspage />);

      screen.getByText('롯데');
      screen.getByText('감자칩');
      screen.getByText('3,000원');
    });

    it('상품을 클릭해서 주문 페이지로 이동하는것을 확인할 수 있다', () => {
      render(<Productspage />);

      fireEvent.click(screen.getByText('감자칩'));

      expect(navigate).toBeCalledWith('/products/2');
    });
  });

  context('상품이 존재하지 않을 경우', () => {
    beforeEach(() => {
      products = [];

      pageNumbers = [1];
    });

    it('상품이 존재하지 않다는 메세지를 확인할 수 있다', () => {
      render(<Productspage />);

      screen.getByText('상품이 존재하지 않습니다');
    });
  });
});
