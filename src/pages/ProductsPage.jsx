import Products from '../components/Products';
import StoreHeader from '../components/StoreHeader';

export default function Productspage(props) {
  return (
    <div>
      <StoreHeader />
      <Products location={props} />
    </div>
  );
}
