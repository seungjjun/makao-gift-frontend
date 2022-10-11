/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useEffect } from 'react';

import styled from 'styled-components';

import { useLocation, useNavigate } from 'react-router-dom';

import useShopStore from '../hooks/useShopStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const P = styled.p`
  font-size: 1.3em;
  font-weight: bold;
  margin: auto;
  width: 60%;
  padding: 2.4em 0 1em;
`;

const Orders = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OrderHistories = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  max-width: 1024px;
`;

const List = styled.li`
  margin: 1em;
`;

const Manufacturer = styled.p`
  font-weight: #999999;
  margin-block: .5em;
`;

const Name = styled.p`
`;

const Receiver = styled.p`
  font-weight: bold;
  margin-top: .5em;
`;

const Image = styled.img`
  width: 280px;
  height: 280px;
`;

const Pages = styled.ul`
  display: flex;
  justify-content: center;
  gap: .5em;

  button {
    margin-right: 1em;
    border: none;
    background-color: #fff;
  }
`;

export default function OrderList() {
  const shopStore = useShopStore();

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    shopStore.fetchTransactions(location.pathname.split('=')[1]);

    shopStore.pagination();
  }, []);

  const { transactions } = shopStore;

  const handleClickDetail = (id) => {
    navigate(`/orders/${id}`);
  };

  const handleClickPageNumber = async (e) => {
    const { value } = e.target;
    navigate(`/orders?page=${value}`);
    await shopStore.fetchTransactions(value);
  };

  const { pageNumbers } = shopStore;

  if (!transactions.length) {
    return (
      <p>내가 주문한 내역이 없습니다</p>
    );
  }

  return (
    <Container>
      <P>내가 주문한 내역입니다</P>
      <Orders>
        <OrderHistories>
          {transactions.map((transaction) => (
            <List
              type="button"
              key={transaction.id}
              onClick={() => handleClickDetail(transaction.id)}
            >
              <Image src={transaction.image} alt="product" />
              <Manufacturer>{transaction.manufacturer}</Manufacturer>
              <Name>
                {transaction.productName}
              </Name>
              <Receiver>
                To.
                {transaction.receiver}
              </Receiver>
            </List>
          ))}
        </OrderHistories>
      </Orders>
      <Pages>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              type="button"
              value={number}
              onClick={(e) => handleClickPageNumber(e)}
            >
              {number}
            </button>
          </li>
        ))}
      </Pages>
    </Container>
  );
}
