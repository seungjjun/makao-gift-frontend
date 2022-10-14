import { fireEvent, render, screen } from '@testing-library/react';

import Welcome from '../../src/components/Welcome';

test('Welcome', () => {
  const name = '치코리타';
  const navigate = jest.fn();

  render(<Welcome
    name={name}
    navigate={navigate}
  />);

  screen.getByText('회원가입 완료');
  screen.getByText('치코리타님 마카오 선물하기 회원가입이 완료되었습니다.');
  screen.getByText('정상적인 서비스 이용을 위해 로그인을 진행해주세요.');

  fireEvent.click(screen.getByText('로그인하기'));

  expect(navigate).toBeCalled();
});
