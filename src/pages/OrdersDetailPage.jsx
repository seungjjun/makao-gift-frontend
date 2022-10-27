import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import OrderListDetail from '../components/OrderListDetail';

import useShopStore from '../hooks/useShopStore';

export default function OrdersDetailPage() {
  const shopStore = useShopStore();

  const location = useLocation();

  const { transaction } = shopStore;

  useEffect(() => {
    const path = location.pathname;
    const orderListId = path.split('/')[2];

    shopStore.fetchTransaction(orderListId);
  }, [location.pathname.split('/')[2]]);

  return (
    <OrderListDetail
      transaction={transaction}
    />
  );
}
