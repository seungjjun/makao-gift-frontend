import { useEffect } from 'react';

import OrderList from '../components/OrderList';

import useShopStore from '../hooks/useShopStore';

export default function OrdersPage() {
  const shopStore = useShopStore();

  useEffect(() => {
    shopStore.fetchTransactions();
  }, []);

  return (
    <OrderList />
  );
}
