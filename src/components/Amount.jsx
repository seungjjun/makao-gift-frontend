import { useEffect } from 'react';

import useShopStore from '../hooks/useShopStore';

import numberFormat from '../utils/NumberFormat';

export default function Amount() {
  const shopStore = useShopStore();

  // useEffect(() => {
  //   shopStore.fetchUser();
  // }, []);

  return (
    <section>
      <p>
        내 잔액:
        {' '}
        {numberFormat(shopStore.amount)}
        원
      </p>
    </section>

  );
}
