import { useEffect } from 'react';
import useProductStore from '../hooks/useProductStore';

export default function Products() {
  const productStore = useProductStore();

  useEffect(() => {
    productStore.fetchProducts();
  }, []);

  const { products } = productStore;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {product.manufacturer}
        </li>
      ))}
    </ul>
  );
}
