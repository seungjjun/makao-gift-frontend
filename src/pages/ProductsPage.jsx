import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import Products from '../components/Products';

import StoreHeader from '../components/StoreHeader';

import useProductStore from '../hooks/useProductStore';

export default function Productspage() {
  const navigate = useNavigate();

  const productStore = useProductStore();

  const { pageNumbers } = productStore;

  const { products } = productStore;

  useEffect(() => {
    productStore.fetchProducts(window.location.href.split('=')[1]);
    productStore.pagination();
  }, [window.location.href.split('=')[1]]);

  return (
    <div>
      <StoreHeader />
      <Products
        navigate={navigate}
        productStore={productStore}
        pageNumbers={pageNumbers}
        products={products}
      />
    </div>
  );
}
