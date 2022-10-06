import { useEffect } from 'react';

import useShopStore from '../hooks/useShopStore';

export default function Transactions() {
  const shopStroe = useShopStore();

  useEffect(() => {
    shopStroe.fetchTransactions();
  }, []);

  const { transactions } = shopStroe;

  if (!transactions.length) {
    return (
      <p>내가 주문한 내역이 없습니다</p>
    );
  }

  return (
    <div>
      <p>내가 주문한 내역입니다</p>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <p>{transaction.manufacturer}</p>
            <p>
              {transaction.option}
              {transaction.productName}
            </p>
            <p>
              To.
              {transaction.receiver}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
