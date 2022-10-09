/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import useShopStore from '../hooks/useShopStore';

import useOrderStore from '../hooks/useOrderStore';

export default function LoginForm() {
  const shopStore = useShopStore();
  const orderStore = useOrderStore();

  const navigate = useNavigate();

  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const { userId, password } = data;

    orderStore.changeUserId(userId);

    const accessToken = await shopStore.login({ userId, password });

    if (accessToken) {
      setAccessToken(accessToken);

      navigate('/');
    }
  };

  return (
    <div>
      <h2>USER LOGIN</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          id="input-userId"
          type="text"
          placeholder="아이디"
          {...register('userId', {
            required: { value: true, message: '아이디를 입력해주세요' },
          })}
        />
        <p />
        <input
          id="input-password"
          type="password"
          placeholder="비밀번호"
          {...register('password', {
            required: { value: true, message: '비밀번호를 입력해주세요' },
          })}
        />
        {errors.password ? (
          <p>{errors.password.message}</p>
        ) : errors.userId ? (
          <p>{errors.userId.message}</p>
        ) : (
          null
        )}
        {shopStore.isLoginFail ? (
          <p>{shopStore.errorMessage}</p>
        ) : null}
        <button type="submit">
          로그인하기
        </button>
      </form>
    </div>
  );
}
