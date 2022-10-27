import { fireEvent, render, screen } from '@testing-library/react';

import WelcomePage from './WelcomePage';

let name = '';

jest.mock('../hooks/useShopStore', () => () => ({
  name,
}));

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

const context = describe;

describe('WelcomePage', () => {
  context('회원가입 후 환영인사 페이지가 렌더링 될 경우', () => {
    beforeEach(() => {
      name = '노승준';

      render(<WelcomePage />);
    });
    it('회원가입시 입력한 이름과 함께 환영문구가 보인다.', () => {
      screen.getByText('회원가입 완료');
      screen.getByText('노승준님 마카오 선물하기 회원가입이 완료되었습니다.');
      screen.getByText('정상적인 서비스 이용을 위해 로그인을 진행해주세요.');
    });

    it('로그인 버튼을 클릭해서 로그인 페이지로 이동한 것을 확인할 수 있다.', () => {
      screen.getByText('로그인하기');

      fireEvent.click(screen.getByText('로그인하기'));

      expect(navigate).toBeCalledWith('/login');
    });
  });
});
