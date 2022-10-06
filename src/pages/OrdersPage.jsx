import { useEffect } from 'react';
import Transactions from '../components/Transactions';

import useShopStore from '../hooks/useShopStore';

export default function OrdersPage() {
  const shopStore = useShopStore();

  useEffect(() => {
    shopStore.fetchTransactions();
  }, []);

  return (
    <Transactions />
  );
}
