/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  margin: auto;
`;

const Title = styled.h2`
  font-size: 2.4em;
  font-weight: bold;
  padding-bottom: .4em;
`;

const Form = styled.form`
  padding-top: 3.5em;
  border-top: 1px solid #937DC2;
  width: 25%;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  margin-bottom: 1em;
  padding: 1em;
  border: 1px solid #CCC;

  &:focus {
    border: 1px solid #937DC2;
  }
`;

const Error = styled.p`
  color: #FF424D;
`;

const LoginButton = styled.button`
  width: 100%;
  margin-top: 2em;
  padding: 1.5em;
  border: none;
  border-radius: 1em;
  background-color: #937DC2;
  color: #fff;
`;

const RegisterButton = styled.button`
  width: 100%;
  margin-top: 2em;
  padding: 1.5em;
  border: none;
  background-color: #fff;

`;

export default function LoginForm({
  navigate, shopStore, isLoginFail, submit, register, handleSubmit, errors,
}) {
  const onSubmit = async (data) => {
    submit(data);
  };

  const handleClickRegister = () => {
    navigate('/signup');
  };

  return (
    <Container>
      <Title>USER LOGIN</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="input-userId"
          type="text"
          placeholder="아이디"
          {...register('userId', {
            required: { value: true, message: '아이디를 입력해주세요' },
          })}
        />
        <p />
        <Input
          id="input-password"
          type="password"
          placeholder="비밀번호"
          {...register('password', {
            required: { value: true, message: '비밀번호를 입력해주세요' },
          })}
        />
        {errors.password ? (
          <Error>{errors.password.message}</Error>
        ) : errors.userId ? (
          <Error>{errors.userId.message}</Error>
        ) : isLoginFail ? (
          <Error>{shopStore.errorMessage}</Error>
        ) : null}
        <LoginButton type="submit">
          로그인하기
        </LoginButton>
        <RegisterButton
          type="button"
          onClick={handleClickRegister}
        >
          회원가입
        </RegisterButton>
      </Form>
    </Container>
  );
}
