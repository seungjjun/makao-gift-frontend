import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import OrderList from '../components/OrderList';

import useShopStore from '../hooks/useShopStore';

export default function OrdersPage() {
  const [accessToken] = useLocalStorage('accessToken', '');

  const shopStore = useShopStore();

  const { transactions } = shopStore;

  const navigate = useNavigate();

  const location = useLocation();

  const { pageNumbers } = shopStore;

  useEffect(() => {
    if (accessToken) {
      shopStore.fetchTransactions(location.pathname.split('=')[1]);

      shopStore.pagination();
    }

    if (!accessToken) {
      shopStore.resetTransactions();
    }
  }, []);

  return (
    <OrderList
      shopStore={shopStore}
      navigate={navigate}
      transactions={transactions}
      pageNumbers={pageNumbers}
      accessToken={accessToken}
    />
  );
}
