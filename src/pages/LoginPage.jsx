import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import { useEffect } from 'react';
import LoginForm from '../components/LoginForm';

import useShopStore from '../hooks/useShopStore';

import useOrderStore from '../hooks/useOrderStore';

export default function LoginPage() {
  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const { register, handleSubmit, formState: { errors } } = useForm();

  const shopStore = useShopStore();
  const orderStore = useOrderStore();
  const navigate = useNavigate();

  const { isLoginFail } = shopStore;

  useEffect(() => {
    shopStore.resetErrorMessage();
  }, []);

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
    <LoginForm
      navigate={navigate}
      shopStore={shopStore}
      isLoginFail={isLoginFail}
      submit={onSubmit}
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
    />
  );
}
