import numberFormat from '../utils/NumberFormat';

export default function Amount({ orderStore }) {
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
