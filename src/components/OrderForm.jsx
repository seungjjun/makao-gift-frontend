/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form';

import styled from 'styled-components';

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

  border: ${(props) => (props.error ? '1px solid #ff0000' : '1px solid #CCC')};

  ::placeholder {
      color: #CCC;
    }

  &:focus {
    outline: 1px solid #937DC2;
  }
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

export default function OrderForm({ orderStore, submit }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    submit(data);
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
            ????????????:
            {' '}
            {orderStore.productNumber}
          </PurchaseQuantity>
          <TotalPrice>
            ??? ????????????:
            {' '}
            {numberFormat(orderStore.price)}
            ???
          </TotalPrice>
        </div>
      </ProductInformation>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="input-receiver">
          ?????? ??? ??????
          <strong>*</strong>
        </Label>
        <Input
          type="text"
          id="input-receiver"
          error={errors.receiver}
          {...register('receiver', {
            required: { value: true, message: '????????? ??????????????????' },
            pattern: { value: /^[???-???|???-???]{3,7}$/, message: '?????? ??? ????????? ?????? ??????????????????' },
          })}
        />
        {errors.receiver ? (
          <Error>{errors.receiver.message}</Error>
        ) : (
          <Guide>3 ~ 7????????? ????????? ?????? ??????</Guide>
        ) }
        <Label htmlFor="input-address">
          ?????? ??? ??????
          <strong>*</strong>
        </Label>
        <Input
          type="text"
          id="input-address"
          error={errors.address}
          {...register('address', {
            required: { value: true, message: '????????? ??????????????????' },
          })}
        />
        {errors.address ? (
          <Error>{errors.address.message}</Error>
        ) : (
          <Guide>???????????? ??????????????????</Guide>
        )}
        <Label htmlFor="input-message">
          ?????? ?????? ????????? ?????????
        </Label>
        <Input
          type="text"
          id="input-message"
          {...register('message', {
            maxLength: 100,
          })}
        />
        {errors.message ? (
          <Error>100?????? ????????? ??????????????????</Error>
        ) : (
          <Guide>100?????? ????????? ??????????????????</Guide>
        )}
        <ButtonBox>
          <Button type="submit">????????????</Button>
        </ButtonBox>
      </Form>
    </Container>
  );
}
