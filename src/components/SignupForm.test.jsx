import {
  fireEvent, render, screen,
} from '@testing-library/react';

import SignupForm from './SignupForm';

// const navigate = jest.fn();

// jest.mock('react-router-dom', () => ({
//   useNavigate() {
//     return navigate;
//   },
// }));

test('signup', async () => {
  const shopStore = jest.fn();
  const register = jest.fn();
  const watch = jest.fn();
  const handleSubmit = jest.fn();
  const errors = jest.fn();
  const submit = jest.fn();

  render((
    <SignupForm
      shopStore={shopStore}
      register={register}
      watch={watch}
      handleSubmit={handleSubmit}
      errors={errors}
      submit={submit}
    />
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

  fireEvent.click(screen.getByText('회원가입'));

  expect(handleSubmit).toBeCalled();
});
