/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import useOrderStore from '../hooks/useOrderStore';

import numberFormat from '../utils/NumberFormat';

export default function OrderForm() {
  const orderStore = useOrderStore();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const { receiver, address, message } = data;

    orderStore.order('jel1y', receiver, address, message);

    navigate('/orders');
  };

  return (
    <div>
      <div>
        <p>이미지</p>
        <p>{orderStore.manufacturer}</p>
        <p>
          {orderStore.option}
          {' '}
          {orderStore.productName}
        </p>
        <p>
          구매수량:
          {' '}
          {orderStore.productNumber}
        </p>
        <p>
          총 상품금액:
          {' '}
          {numberFormat(orderStore.price)}
          원
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="input-receiver">
          받는 분 성함
        </label>
        <input
          type="text"
          id="input-receiver"
          {...register('receiver', {
            required: true,
            pattern: /^[ㄱ-ㅎ|가-힣]+$/,
          })}
        />
        {errors.receiver ? (
          <p>받는 분 성함을 다시 확인해주세요</p>
        ) : (
          <p>3 ~ 7자까지 한글만 사용 가능</p>
        ) }
        <label htmlFor="input-address">
          받는 분 주소
        </label>
        <input
          type="text"
          id="input-address"
          {...register('address', {
            required: true,
          })}
        />
        {errors.address ? (
          <p>주소를 입력해주세요</p>
        ) : (
          <p>주소지를 입력해주세요</p>
        )}
        <label htmlFor="input-message">
          받는 분께 보내는 메세지
        </label>
        <input
          type="text"
          id="input-message"
          {...register('message')}
        />
        <div>
          <button type="submit">선물하기</button>
        </div>
      </form>
    </div>
  );
}
