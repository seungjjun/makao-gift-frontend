import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 80vh;
  margin: auto;
`;

const Title = styled.h2`
  font-size: 2em;
  font-weight: bold;
`;

const WelcomeSentence = styled.p`
  margin-top: 2em;
`;

const Button = styled.button`
  width: 50%;
  margin-top: 2em;
  padding: 1.5em;
  border: none;
  border-radius: 1em;
  background: #937DC2;
  color: #fff;
`;

export default function Welcome({ name, navigate }) {
  const handleClickLogin = () => {
    navigate('/login');
  };

  return (
    <Container>
      <Title>
        회원가입 완료
      </Title>
      <WelcomeSentence>
        {name}
        님 마카오 선물하기 회원가입이 완료되었습니다.
      </WelcomeSentence>
      <p>정상적인 서비스 이용을 위해 로그인을 진행해주세요.</p>
      <Button
        type="button"
        onClick={handleClickLogin}
      >
        로그인하기
      </Button>
    </Container>
  );
}
