import Welcome from '../components/Welcome';

import useShopStore from '../hooks/useShopStore';

export default function WelcomePage() {
  const shopStore = useShopStore();

  const { name } = shopStore;
  return (
    <Welcome name={name} />
  );
}
