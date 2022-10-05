import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import useProductStore from '../hooks/useProductStore';

import numberFormat from '../utils/NumberFormat';

export default function ProductDetail() {
  const productStore = useProductStore();

  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const productId = path.charAt(path.length - 1);

    productStore.fetchProduct(productId);
  }, []);

  const { product } = productStore;

  const handleClickCount = (e) => {
    productStore.changeProductNumber(e.target.innerText, product.price);
  };

  return (
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
      <button type="button">선물하기</button>
    </div>
  );
}
