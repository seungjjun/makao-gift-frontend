import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import LoginForm from '../../src/components/LoginForm';

import { shopStore } from '../../src/stores/ShopStore';

const register = jest.fn();
const handleSubmit = jest.fn();
const formState = jest.fn();

jest.mock('react-hook-form', () => ({
  useForm() {
    return {
      register,
      handleSubmit,
      formState,
    };
  },
}));

test('LoginForm', async () => {
  const navigate = jest.fn();
  const isLoginFail = jest.fn();
  const onSubmit = jest.fn();

  formState.errors = false;

  render(
    <LoginForm
      navigate={navigate}
      shopStore={shopStore}
      isLoginFail={isLoginFail}
      submit={onSubmit}
    />,
  );

  screen.getByPlaceholderText('아이디');

  screen.getByText('USER LOGIN');

  fireEvent.change(screen.getByPlaceholderText('아이디'), {
    target: { value: 'jel1y' },
  });

  fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
    target: { value: 'Qwe1234!' },
  });

  fireEvent.click(screen.getByText('로그인하기'));

  // fireEvent.submit(screen.getByText('로그인하기'));
  // expect(onSubmit).toBeCalled();

  await waitFor(() => {
    expect(navigate).toBeCalled();
  });
});
