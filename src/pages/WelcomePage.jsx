import { useNavigate } from 'react-router-dom';
import Welcome from '../components/Welcome';

import useShopStore from '../hooks/useShopStore';

export default function WelcomePage() {
  const shopStore = useShopStore();

  const navigate = useNavigate();

  const { name } = shopStore;
  return (
    <Welcome
      name={name}
      navigate={navigate}
    />
  );
}
