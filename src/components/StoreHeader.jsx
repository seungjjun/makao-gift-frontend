import styled from 'styled-components';

const Background = styled.section`
  background: url('https://user-images.githubusercontent.com/104769120/195258226-6ae7811e-ef3b-40a2-b370-fd85dc1ab6d9.jpg'); 
  background-size: cover;                     
  background-repeat: no-repeat;
`;

const Container = styled.div`
  font-size: 1.2em;
  width: 50%;
  margin: auto;
  padding: 3em 2em;

  p:first-child {
    font-weight: bold;
    color: #6F38C5;
  }

  h2 {
    font-weight: bold;
    margin: 1em 0;
  }

  strong {
    display: block;
  }

  p:last-child {
    font-size: .8em;
  }
`;

export default function StoreHeader() {
  return (
    <Background>
      <Container>
        <p>평범한 선물은 주기도 민망하다구요?</p>
        <h2>
          작정하고 준비한
          <strong>마카오톡 선물하기 아이템</strong>
        </h2>
        <p>마카오톡 선물하기에서만 볼 수 있는 특별템 기획전</p>
      </Container>
    </Background>
  );
}
