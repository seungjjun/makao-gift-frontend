import { useEffect } from 'react';

import useShopStore from '../hooks/useShopStore';

export default function Amount() {
  const shopStore = useShopStore();

  useEffect(() => {
    shopStore.fetchUser();
  }, []);

  return (
    <p>
      내 잔액:
      {' '}
      {shopStore.amount}
      원
    </p>
  );
}
