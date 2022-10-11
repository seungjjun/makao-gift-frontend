import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import styled from 'styled-components';

import useShopStore from '../hooks/useShopStore';

import numberFormat from '../utils/NumberFormat';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Background = styled.div`
  width: 100%;
  height: 11em;
  background-color: #D2DAFF;

  div {
    width: 20%;
    margin: auto;
  }
`;

const Image = styled.img`
  width: 20em;
  height: 20em;
`;

const Information = styled.div`
  width: 35%;
`;

const Manufacturer = styled.p`
  text-align: center;
  margin-top: 12em;
  color: #999999;
`;

const Option = styled.p`
  text-align: center;
  margin-top: .8em;
  margin-bottom: 1.7em;
  font-weight: bold;
`;

const Transaction = styled.p`
  display: flex;
  justify-content: space-between;
  padding: 1em;
  border-bottom: 1px solid #D9D9D9;

  strong {
    color: #666666;
  }
`;

export default function OrderListDetail() {
  const shopStore = useShopStore();

  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const orderListId = path.split('/')[2];

    shopStore.fetchTransaction(orderListId);
  }, []);

  const { transaction } = shopStore;

  return (
    <Container>
      <Background>
        <div>
          <Image src={transaction.image} alt="product" />
        </div>
      </Background>
      <Information>
        <Manufacturer>{transaction.manufacturer}</Manufacturer>
        <Option>
          {transaction.option}
          {' '}
          {transaction.productName}
        </Option>
        <Transaction>
          구매수량
          <strong>
            {transaction.productNumber}
          </strong>
        </Transaction>
        <Transaction>
          총 상품금액
          <strong>
            {numberFormat(transaction.price)}
            원
          </strong>
        </Transaction>
        <Transaction>
          구매일
          <strong>
            {transaction.createdAt}
          </strong>
        </Transaction>
        <Transaction>
          받는 분
          <strong>
            {transaction.receiver}
          </strong>
        </Transaction>
        <Transaction>
          받는 분 주소
          <strong>
            {transaction.address}
          </strong>
        </Transaction>
        <Transaction>
          받는 분께 보내는 메세지
          <strong>
            {transaction.message}
          </strong>
        </Transaction>
      </Information>

    </Container>
  );
}
