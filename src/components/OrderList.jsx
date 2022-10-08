/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import useShopStore from '../hooks/useShopStore';

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
    <div>
      <p>내가 주문한 내역입니다</p>
      <ul>
        {transactions.map((transaction) => (
          <li
            type="button"
            key={transaction.id}
            onClick={() => handleClickDetail(transaction.id)}
          >
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
      <ul>
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
      </ul>
    </div>
  );
}
