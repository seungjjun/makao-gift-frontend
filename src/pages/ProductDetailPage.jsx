import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import ProductDetail from '../components/ProductDetail';

import useOrderStore from '../hooks/useOrderStore';

import useProductStore from '../hooks/useProductStore';

export default function ProductDetailPage() {
  const [accessToken] = useLocalStorage('accessToken', '');

  const navigate = useNavigate();

  const location = useLocation();

  const productStore = useProductStore();
  const orderStore = useOrderStore();

  const { product } = productStore;

  useEffect(() => {
    orderStore.orderState = '';
    const path = location.pathname;
    const productId = path.split('/')[2];

    productStore.fetchProduct(productId);
  }, []);

  return (
    <div>
      <ProductDetail
        accessToken={accessToken}
        productStore={productStore}
        orderStore={orderStore}
        product={product}
        navigate={navigate}
      />
    </div>
  );
}
