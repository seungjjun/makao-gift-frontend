import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import useProductStore from '../hooks/useProductStore';

import numberFormat from '../utils/NumberFormat';

export default function Products() {
  const navagate = useNavigate();

  const productStore = useProductStore();

  useEffect(() => {
    productStore.fetchProducts();
    productStore.pagination();
  }, []);

  const handleClickPageNumber = async (e) => {
    const { value } = e.target;
    navagate(`/products?page=${value}`);
    productStore.fetchProducts(value);
  };

  const { pageNumbers } = productStore;

  const { products } = productStore;
  return (
    <section>
      <p>인기선물을 한 자리에 모았어요</p>
      <div>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <p>
                제조사:
                {' '}
                {product.manufacturer}
              </p>
              <p>
                상품 이름:
                {' '}
                {product.option}
                {' '}
                {product.name}
              </p>
              <p>
                {numberFormat(product.price)}
                원
              </p>
            </li>
          ))}
        </ul>
        <ul>
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                type="button"
                value={number}
                onClick={(e) => handleClickPageNumber(e)}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
