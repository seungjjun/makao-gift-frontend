/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import useShopStore from '../hooks/useShopStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
`;

const Title = styled.h2`
  font-size: 2.4em;
  font-weight: bold;
  padding: 2em 0 .4em 0;
`;

const Form = styled.form`
  padding-top: 1.5em;
  border-top: 1px solid #937DC2;
  width: 25%;
`;

const Label = styled.label`
  font-weight: bold;
  display: flex;
  margin: 2em 0 .4em 0;
  color: #A0A0A0;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 1em;
  border: 1px solid #CCC;

  &:focus {
    border: 1px solid #937DC2;
  }
`;

const Guide = styled.p`
  margin-top: .4em;
  color: #A0A0A0;
`;

const Error = styled.p`
  margin-top: .4em;
  color: #FF424D;
`;

const Button = styled.button`
  margin-top: 4em;
  padding: 1.5em;
  width: 100%;
  border: none;
  border-radius: 1em;
  background: #937DC2;
  color: #fff;
`;

export default function SignupForm() {
  const shopStore = useShopStore();

  const navigate = useNavigate();

  const {
    register, watch, handleSubmit, formState: { errors },
  } = useForm({ reValidateMode: 'onSubmit' });

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
    <Container>
      <Title>SIGN UP</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label
          htmlFor="input-name"
        >
          이름 :
        </Label>
        <Input
          id="input-name"
          type="text"
          {...register('name', {
            required: { value: true, message: '이름을 입력해주세요' },
            pattern: { value: /^[ㄱ-ㅎ|가-힣]{3,7}$/, message: '이름을 다시 확인해주세요' },
          })}
        />
        {errors.name ? (
          <Error>{errors.name.message}</Error>
        ) : (
          <Guide>3 ~ 7자까지 한글만 사용 가능</Guide>
        )}
        <Label
          htmlFor="input-userId"
        >
          아이디 :
        </Label>
        <Input
          id="input-userId"
          type="text"
          {...register('userId', {
            required: { value: true, message: '아이디를 입력해주세요' },
            pattern: { value: /^[a-z0-9]{4,16}$/, message: '아이디를 다시 확인해주세요' },
          })}
        />
        {errors.userId ? (
          <Error>{errors.userId.message}</Error>
        ) : shopStore.isExistingUserId ? (
          <Error>{shopStore.errorMessage}</Error>
        ) : (
          <Guide>영문소문자/숫자,4~16자만 사용 가능</Guide>
        )}
        <Label
          htmlFor="input-password"
        >
          비밀번호 :
        </Label>
        <Input
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
          <Error>{errors.password.message}</Error>
        ) : (
          <Guide>8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 함</Guide>
        )}
        <Label
          htmlFor="input-confirmPassword"
        >
          비밀번호 확인 :
        </Label>
        <Input
          id="input-confirmPassword"
          type="password"
          {...register('confirmPassword', {
            required: true,
            validate: (value) => value === watch('password'),
          })}
        />
        {errors.confirmPassword ? (
          <Error>비밀번호가 일치하지 않습니다</Error>
        ) : null}
        <Button type="submit">
          회원가입
        </Button>
      </Form>
    </Container>
  );
}
