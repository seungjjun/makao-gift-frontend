import { useEffect } from 'react';

import { shopStore } from '../stores/ShopStore';

import useForceUpdate from './useForceUpdate';

export default function useShopStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    shopStore.subscribe(forceUpdate);

    return () => shopStore.unsubscribe(forceUpdate);
  }, [forceUpdate]);

  return shopStore;
}
