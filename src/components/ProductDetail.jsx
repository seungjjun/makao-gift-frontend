/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import minusBlack from '../assets/minus-black.png';
import minusGray from '../assets/minus-gray.png';
import plusBlack from '../assets/plus-black.png';

import useOrderStore from '../hooks/useOrderStore';

import useProductStore from '../hooks/useProductStore';

import numberFormat from '../utils/NumberFormat';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 7em;
  gap: 4em;
`;

const ProductImage = styled.img`
  width: 30em;
  height: 30em;
`;

const ProductImformation = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
`;

const Name = styled.p`
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 1em;
`;

const Option = styled.p`
  padding-block: 1.3em;
  border-top: 1px solid #CCC;
  color: #666666;

  strong {
    font-weight: 600;
    margin-left: 1em;
    color: #000;
  }
`;

const Price = styled.p`
  font-size: 1.5em;
  font-weight: bold;
  margin-block: 1em;
`;

const Manufacturer = styled.p`
  padding-block: 1.3em;
  border-top: 1px solid #CCC;
  color: #666666;

  strong {
    font-weight: 600;
    margin-left: 1em;
    color: #000;
  }
`;

const PurchaseQuantity = styled.p`
  padding-block: 1.3em;
  border-top: 1px solid #CCC;
  color: #666666;

  input {
    text-align: center;
    width: 15%;
    padding-top: 4.5px;
    border: 1px solid #CCC;
    border-left: none;
    border-right: none;
  }

  img {
    width: 25px;
    height: 25px;
    border: 1px solid #CCC;
    border-right: none;
    cursor: pointer;
  }
`;

const TotalPrice = styled.p`
  display: flex;
  justify-content: end;
  align-items: center;
  padding-block: 1.3em;
  border-top: 1px solid #CCC;

  strong {
    font-size: 1.5em;
    font-weight: bold;
    margin-left: .4em;
  }
`;

const Button = styled.button`
  padding: .8em;
  border: none;
  border-radius: 1em;
  background: #937DC2;
  color: #fff;
`;

const Error = styled.p`
  text-align: center;
  margin-top: 1em;
`;

export default function ProductDetail({ accessToken }) {
  const productStore = useProductStore();
  const orderStore = useOrderStore();

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    orderStore.orderState = '';
    const path = location.pathname;
    const productId = path.split('/')[2];

    productStore.fetchProduct(productId);
  }, []);

  const { product } = productStore;

  const handleClickCount = (e) => {
    const { target } = e;
    productStore.changeProductNumber(target.alt, product.price);
  };

  const handleClickGift = async () => {
    if (!accessToken) {
      navigate('/login');
      return;
    }

    if (orderStore.amount < productStore.productPrice) {
      orderStore.changeOrderState();
      return;
    }

    orderStore.productInformation(
      product.image,
      product.manufacturer,
      product.name,
      product.option,
      productStore.productNumber,
      productStore.productPrice,
    );

    navigate('/order');
  };

  return (
    <Container>
      <div>
        <ProductImage src={product.image} alt="product" />
      </div>
      <ProductImformation>
        <Name>
          {product.name}
        </Name>
        <Price>
          {numberFormat(product.price)}
          원
        </Price>
        <Manufacturer>
          제조사
          {' '}
          <strong>
            {product.manufacturer}
          </strong>
        </Manufacturer>
        <div>
          <PurchaseQuantity>
            구매수량
            {productStore.productNumber === 1 ? (
              <img
                src={minusGray}
                onClick={(e) => handleClickCount(e)}
                alt="minusGrayImage"
              />
            ) : (
              <img
                src={minusBlack}
                onClick={(e) => handleClickCount(e)}
                alt="minusBlackImage"
              />
            )}
            <input
              type="number"
              value={productStore.productNumber}
              readOnly
            />
            <img
              src={plusBlack}
              onClick={(e) => handleClickCount(e)}
              alt="plusBlakImage"
            />
          </PurchaseQuantity>
          <Option>
            상품설명
            {' '}
            <strong>
              {product.option}
            </strong>
          </Option>
        </div>
        <TotalPrice>
          총 상품금액:
          {' '}
          <strong>
            {numberFormat(productStore.productPrice)}
            원
          </strong>
        </TotalPrice>
        <Button
          type="button"
          onClick={handleClickGift}
        >
          선물하기
        </Button>
        {orderStore.isOrderFail ? (
          <Error>❌ 잔액이 부족하여 선물하기가 불가합니다 ❌</Error>
        ) : null}
      </ProductImformation>

    </Container>
  );
}
