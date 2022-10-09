import useOrderStore from '../hooks/useOrderStore';

import numberFormat from '../utils/NumberFormat';

export default function Amount() {
  const orderStore = useOrderStore();

  return (
    <section>
      <p>
        내 잔액:
        {' '}
        {numberFormat(orderStore.amount)}
        원
      </p>
    </section>
  );
}
