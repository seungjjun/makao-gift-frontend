/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import useShopStore from '../hooks/useShopStore';

export default function SignupForm() {
  const shopStore = useShopStore();

  const navigate = useNavigate();

  const {
    register, watch, handleSubmit, formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    shopStore.registrationState = '';

    const {
      name, userId, password, confirmPassword,
    } = data;

    await shopStore.register(name, userId, password, confirmPassword);

    if (shopStore.isExistingUserId) {
      return;
    }

    navigate('/welcome');
  };

  return (
    <div>
      <h2>SIGN UP</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label
          htmlFor="input-name"
        >
          이름 :
        </label>
        <input
          id="input-name"
          type="text"
          {...register('name', {
            required: { value: true, message: '이름을 입력해주세요' },
            pattern: { value: /^[ㄱ-ㅎ|가-힣]{3,7}$/, message: '이름을 다시 확인해주세요' },
          })}
        />
        {errors.name ? (
          <p>{errors.name.message}</p>
        ) : (
          <p>3 ~ 7자까지 한글만 사용 가능</p>
        )}
        <label
          htmlFor="input-userId"
        >
          아이디 :
        </label>
        <input
          id="input-userId"
          type="text"
          {...register('userId', {
            required: { value: true, message: '아이디를 입력해주세요' },
            pattern: { value: /^[a-z0-9]{4,16}$/, message: '아이디를 다시 확인해주세요' },
          })}
        />
        {errors.userId ? (
          <p>{errors.userId.message}</p>
        ) : shopStore.isExistingUserId ? (
          <p>{shopStore.errorMessage}</p>
        ) : (
          <p>영문소문자/숫자,4~16자만 사용 가능</p>
        )}
        <label
          htmlFor="input-password"
        >
          비밀번호 :
        </label>
        <input
          id="input-password"
          type="password"
          {...register('password', {
            required: { value: true, message: '비밀번호를 입력해주세요' },
            pattern: {
              value: /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/,
              message: '비밀번호를 다시 확인해주세요',
            },
          })}
        />
        {errors.password ? (
          <p>{errors.password.message}</p>
        ) : (
          <p>8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 함</p>
        )}
        <label
          htmlFor="input-confirmPassword"
        >
          비밀번호 확인 :
        </label>
        <input
          id="input-confirmPassword"
          type="password"
          {...register('confirmPassword', {
            required: true,
            validate: (value) => value === watch('password'),
          })}
        />
        {errors.confirmPassword ? (
          <p>비밀번호가 일치하지 않습니다</p>
        ) : null}
        <button type="submit">
          회원가입
        </button>
      </form>
    </div>
  );
}
