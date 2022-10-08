/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import useShopStore from '../hooks/useShopStore';

export default function LoginForm() {
  const shopStore = useShopStore();

  const navigate = useNavigate();

  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const { userId, password } = data;
    const accessToken = shopStore.login({ userId, password });
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
          id="input-id"
          type="text"
          placeholder="아이디"
          {...register('id', {
            required: true,
          })}
        />
        <p />
        <input
          id="input-password"
          type="password"
          placeholder="비밀번호"
          {...register('password', {
            required: true,
          })}
        />
        {errors.password ? (
          <p>비밀번호를 입력해주세요</p>
        ) : errors.id ? (
          <p>아이디를 입력해주세요</p>
        ) : (
          null
        )}
        <button type="submit">
          로그인하기
        </button>
      </form>
    </div>
  );
}
