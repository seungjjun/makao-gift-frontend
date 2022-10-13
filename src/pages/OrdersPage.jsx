import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import OrderList from '../components/OrderList';

import useShopStore from '../hooks/useShopStore';

export default function OrdersPage() {
  const shopStore = useShopStore();

  const { transactions } = shopStore;

  const navigate = useNavigate();

  const location = useLocation();

  const { pageNumbers } = shopStore;

  useEffect(() => {
    shopStore.fetchTransactions(location.pathname.split('=')[1]);

    shopStore.pagination();
  }, []);

  return (
    <OrderList
      shopStore={shopStore}
      navigate={navigate}
      transactions={transactions}
      pageNumbers={pageNumbers}
    />
  );
}
