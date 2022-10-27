import { render, screen } from '@testing-library/react';

import Header from '../../src/components/Header';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
  useNavigate() {
    return navigate;
  },
}));

const context = describe;

describe('Header', () => {
  context('when access token not exist', () => {
    it('change menu bar with login and register', () => {
      const accessToken = '';

      const setAccessToken = jest.fn();

      render((
        <Header
          accessToken={accessToken}
          setAccessToken={setAccessToken}
        />
      ));

      screen.getByText('홈');
      screen.getByText('스토어');
      screen.getByText('주문조회');

      screen.getByText('회원가입');
      screen.getByText('로그인');
    });
  });

  context('when access token exist', () => {
    it('change menu bar with logout', () => {
      const accessToken = 'accessToken';

      const setAccessToken = jest.fn();

      render((
        <Header
          accessToken={accessToken}
          setAccessToken={setAccessToken}
        />
      ));

      screen.getByText('홈');
      screen.getByText('스토어');
      screen.getByText('주문조회');

      screen.getByText('로그아웃');
    });
  });
});
