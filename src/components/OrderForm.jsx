/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import useOrderStore from '../hooks/useOrderStore';

import numberFormat from '../utils/NumberFormat';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: auto;
  margin-block: 3em;
  padding: 3em 4em;
  border: 1px solid #D9D9D9;
`;

const ProductInformation = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 2em;

  div {
    margin: 1.5em;
  }
`;
const Manufacturer = styled.p`
  font-weight: bold;
`;

const Option = styled.p`
  margin-top: 1em;
`;

const Name = styled.p`
  margin-top: .4em;
`;

const PurchaseQuantity = styled.p`
  margin-top: 2em;
`;

const TotalPrice = styled.p`
  margin-top: .5em;
`;

const Image = styled.img`
  width: 150px;
  width: 150px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: .4em;
  color: #A0A0A0;

  strong {
    color: #FF424D;
  }
`;

const Input = styled.input`
  padding: 1em;
  border: 1px solid #D8D8D8;
`;

const Guide = styled.p`
  margin-top: .6em;
  margin-bottom: 1.8em;
  color: #A0A0A0;
`;

const Error = styled.p`
  margin-top: .6em;
  margin-bottom: 1.8em;
  color: #FF424D;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  padding: 1em;
  width: 60%;
  border: none;
  border-radius: 1em;
  background: #937DC2;
  color: #fff;
`;

export default function OrderForm() {
  const orderStore = useOrderStore();

  const { userId } = orderStore;

  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { receiver, address, message } = data;

    await orderStore.order(userId, receiver, address, message);

    navigate('/orders');
  };

  return (
    <Container>
      <ProductInformation>
        <Image src={orderStore.image} alt="product" />
        <div>
          <Manufacturer>{orderStore.manufacturer}</Manufacturer>
          <Option>
            {orderStore.option}
          </Option>
          <Name>
            {orderStore.productName}
          </Name>
          <PurchaseQuantity>
            구매수량:
            {' '}
            {orderStore.productNumber}
          </PurchaseQuantity>
          <TotalPrice>
            총 상품금액:
            {' '}
            {numberFormat(orderStore.price)}
            원
          </TotalPrice>
        </div>
      </ProductInformation>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="input-receiver">
          받는 분 성함
          <strong>*</strong>
        </Label>
        <Input
          type="text"
          id="input-receiver"
          {...register('receiver', {
            required: { value: true, message: '성함을 입력해주세요' },
            pattern: { value: /^[ㄱ-ㅎ|가-힣]{3,7}$/, message: '받는 분 성함을 다시 확인해주세요' },
          })}
        />
        {errors.receiver ? (
          <Error>{errors.receiver.message}</Error>
        ) : (
          <Guide>3 ~ 7자까지 한글만 사용 가능</Guide>
        ) }
        <Label htmlFor="input-address">
          받는 분 주소*
        </Label>
        <Input
          type="text"
          id="input-address"
          {...register('address', {
            required: { value: true, message: '주소를 입력해주세요' },
          })}
        />
        {errors.address ? (
          <Error>{errors.address.message}</Error>
        ) : (
          <Guide>주소지를 입력해주세요</Guide>
        )}
        <Label htmlFor="input-message">
          받는 분께 보내는 메세지
        </Label>
        <Input
          type="text"
          id="input-message"
          {...register('message', {
            maxLength: 100,
          })}
        />
        {errors.message ? (
          <Error>100글자 이내로 입력해주세요</Error>
        ) : (
          <Guide>100글자 이내로 입력해주세요</Guide>
        )}
        <ButtonBox>
          <Button type="submit">선물하기</Button>
        </ButtonBox>
      </Form>
    </Container>
  );
}
