import useProductStore from '../hooks/useProductStore';

import numberFormat from '../utils/NumberFormat';

export default function ProductDetail() {
  const productStore = useProductStore();

  const detail = window.location.pathname;
  const productId = detail.charAt(detail.length - 1);

  const { products } = productStore;

  const information = (productId % 8) > 0 ? (productId % 8) - 1 : productId - 1;

  const product = products[information];

  return (
    <div>
      <p>
        {product.option}
        {' '}
        {product.name}
      </p>
      <p>
        {numberFormat(product.price)}
      </p>
      <p>
        제조사
        {' '}
        {product.manufacturer}
      </p>
      <p>총 상품금액:</p>
      <button type="button">선물하기</button>
    </div>
  );
}
