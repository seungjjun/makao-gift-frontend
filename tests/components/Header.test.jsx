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

test('Header', () => {
  render((
    <Header />
  ));

  screen.getByText('홈');
  screen.getByText('로그인');
  screen.getByText('회원가입');
  screen.getByText('스토어');
  screen.getByText('주문조회');
});
