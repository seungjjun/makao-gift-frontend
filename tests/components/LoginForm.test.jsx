import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import LoginForm from '../../src/components/LoginForm';

const navigate = jest.fn();

// jest.mock('../../src/stores/ShopStore');

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

test('LoginForm', async () => {
  render(<LoginForm />);

  screen.getByText('USER LOGIN');

  fireEvent.change(screen.getByPlaceholderText('아이디'), {
    target: { value: 'jel1y' },
  });

  fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
    target: { value: 'Qwe1234!' },
  });

  fireEvent.click(screen.getByText('로그인하기'));

  await waitFor(() => {
    expect(navigate).toBeCalledWith('/');
  });
});
