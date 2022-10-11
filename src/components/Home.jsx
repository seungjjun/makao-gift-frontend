import styled from 'styled-components';

import gift from '../assets/gift.png';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3em auto;
  width: 50%;
`;

const Introduce = styled.div`
  font-size: 1.7em;
  width: 100%;

  h2 {
    font-weight: bold;
    margin: 1.3em 0;
  }
  strong {
    display: block;
    margin-top: .4em;
  }

  p:last-child {
    font-size: .7em;
  }
`;

const ColorParagraph = styled.p`
  font-weight: bold;
  color: #937DC2;
`;

const ImageBox = styled.div`
  width: 100%;
  height: 70vh;
  background: url(${gift}) no-repeat 0 50%; 
  background-size: contain;
`;

export default function Home() {
  return (
    <Container>
      <Introduce>
        <ColorParagraph>무얼 선물할지 고민이라면</ColorParagraph>
        <h2>
          특별한
          {' '}
          <strong>아이템을 전하세요</strong>
        </h2>
        <p>마카오톡 선물하기에서만 볼 수 있는 특별한 아이템</p>
      </Introduce>
      <ImageBox />
    </Container>
  );
}
