import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../../src/components/Header';

test('Header', () => {
  render((
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  ));

  screen.getByText('홈');
  screen.getByText('로그인');
  screen.getByText('회원가입');
  screen.getByText('스토어');
  screen.getByText('주문조회');
});
