import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import SignupForm from './SignupForm';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

test('signup', async () => {
  render((
    <SignupForm />
  ));

  fireEvent.change(screen.getByLabelText('이름 :'), {
    target: { value: '노승준' },
  });

  fireEvent.change(screen.getByLabelText('아이디 :'), {
    target: { value: 'jel1y' },
  });

  fireEvent.change(screen.getByLabelText('비밀번호 :'), {
    target: { value: 'Qwe1234!' },
  });

  fireEvent.change(screen.getByLabelText('비밀번호 확인 :'), {
    target: { value: 'Qwe1234!' },
  });

  fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

  waitFor(() => {
    expect(navigate).toBeCalledWith('/welcome');
  });
});
