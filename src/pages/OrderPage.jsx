import { useNavigate } from 'react-router-dom';

import OrderForm from '../components/OrderForm';

import useOrderStore from '../hooks/useOrderStore';

export default function OrderPage() {
  const orderStore = useOrderStore();
  const navigate = useNavigate();

  const { userId } = orderStore;

  const onSubmit = async (data) => {
    const { receiver, address, message } = data;

    await orderStore.order(userId, receiver, address, message);

    navigate('/orders');
  };

  return (
    <OrderForm
      orderStore={orderStore}
      submit={onSubmit}
    />
  );
}
