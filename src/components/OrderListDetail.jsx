import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import useShopStore from '../hooks/useShopStore';

import numberFormat from '../utils/NumberFormat';

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
    <div>
      <img src={transaction.image} alt="product" />
      <p>{transaction.manufacturer}</p>
      <p>
        {transaction.option}
        {' '}
        {transaction.productName}
      </p>
      <div>
        <p>
          구매수량
          {' '}
          {transaction.productNumber}
        </p>
        <p>
          총 상품금액
          {' '}
          {numberFormat(transaction.price)}
          원
        </p>
        <p>
          구매일
          {' '}
          {transaction.createdAt}
        </p>
        <p>
          받는 분
          {transaction.receiver}
        </p>
        <p>
          받는 분 주소
          {transaction.address}
        </p>
        <p>
          받는 분께 보내는 메세지
          {transaction.message}
        </p>
      </div>
    </div>
  );
}
