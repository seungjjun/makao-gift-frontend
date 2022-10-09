import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import useOrderStore from '../hooks/useOrderStore';

import useProductStore from '../hooks/useProductStore';

import numberFormat from '../utils/NumberFormat';

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
    productStore.changeProductNumber(e.target.innerText, product.price);
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
    <div>
      <div>
        <img src={product.image} alt="product" />
      </div>
      <div>
        <p>
          {product.option}
          {' '}
          {product.name}
        </p>
        <p>
          {numberFormat(product.price)}
          원
        </p>
        <p>
          제조사
          {' '}
          {product.manufacturer}
        </p>
        <div>
          <button type="button" onClick={(e) => handleClickCount(e)}>-</button>
          <input
            type="number"
            value={productStore.productNumber}
            readOnly
          />
          <button type="button" onClick={(e) => handleClickCount(e)}>+</button>
        </div>
        <p>
          총 상품금액:
          {' '}
          {numberFormat(productStore.productPrice)}
          원
        </p>
        <button
          type="button"
          onClick={handleClickGift}
        >
          선물하기
        </button>
        {orderStore.isOrderFail ? (
          <p>❌ 잔액이 부족하여 선물하기가 불가합니다 ❌</p>
        ) : null}
      </div>

    </div>
  );
}
