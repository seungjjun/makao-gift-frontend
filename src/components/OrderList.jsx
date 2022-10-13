/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import styled from 'styled-components';

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
  width: 220px;
  height: 220px;
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

const NotFound = styled.p`
  font-size: 1.3em;
  font-weight: bold;
  text-align: center;
  margin-top: 8em;
`;

export default function OrderList({
  shopStore, navigate, transactions, pageNumbers,
}) {
  const handleClickDetail = (id) => {
    navigate(`/orders/${id}`);
  };

  const handleClickPageNumber = async (e) => {
    const { value } = e.target;
    navigate(`/orders?page=${value}`);
    await shopStore.fetchTransactions(value);
  };

  if (!transactions.length) {
    return (
      <NotFound>내가 주문한 내역이 없습니다</NotFound>
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
