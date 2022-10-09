import { useLocalStorage } from 'usehooks-ts';

import ProductDetail from '../components/ProductDetail';

export default function ProductDetailPage() {
  const [accessToken] = useLocalStorage('accessToken', '');

  return (
    <div>
      <ProductDetail accessToken={accessToken} />
    </div>
  );
}
