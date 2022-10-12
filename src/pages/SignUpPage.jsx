import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import SignupForm from '../components/SignupForm';

import useShopStore from '../hooks/useShopStore';

export default function SignUpPage() {
  const shopStore = useShopStore();

  const navigate = useNavigate();

  const {
    register, watch, handleSubmit, formState: { errors },
  } = useForm({ reValidateMode: 'onSubmit' });

  const submit = async (data) => {
    shopStore.registrationState = '';

    const {
      name, userId, password, confirmPassword,
    } = data;

    await shopStore.register({
      name, userId, password, confirmPassword,
    });

    if (shopStore.isExistingUserId) {
      return;
    }

    navigate('/welcome');
  };

  return (
    <SignupForm
      shopStore={shopStore}
      // navigate={navigate}
      register={register}
      watch={watch}
      handleSubmit={handleSubmit}
      errors={errors}
      submit={submit}
    />
  );
}
