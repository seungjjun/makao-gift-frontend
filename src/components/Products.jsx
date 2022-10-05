/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import useProductStore from '../hooks/useProductStore';

import numberFormat from '../utils/NumberFormat';

export default function Products() {
  const navagate = useNavigate();

  const productStore = useProductStore();

  useEffect(() => {
    productStore.fetchProducts(window.location.href.split('=')[1]);
    productStore.pagination();
  }, []);

  const handleClickPageNumber = async (e) => {
    const { value } = e.target;
    navagate(`/products?page=${value}`);
    await productStore.fetchProducts(value);
  };

  const handleclcikLink = (id) => {
    navagate(`/products/${id}`);
  };

  const { pageNumbers } = productStore;

  const { products } = productStore;
  return (
    <section>
      <p>인기선물을 한 자리에 모았어요</p>
      <div>
        <ul>
          {products.length === 0 ? (
            <p>상품이 존재하지 않습니다</p>
          ) : (
            products.map((product) => (
              <li
                type="button"
                key={product.id}
                onClick={() => handleclcikLink(product.id)}
              >
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
            ))
          )}
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
