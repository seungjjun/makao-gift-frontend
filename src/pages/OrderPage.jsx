import { useLocalStorage } from 'usehooks-ts';
import { useNavigate } from 'react-router-dom';
import OrderForm from '../components/OrderForm';

export default function OrderPage() {
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  const navigate = useNavigate();

  if (accessToken) {
    navigate('/');
  }

  return (
    <OrderForm />
  );
}
