import OrderStore from '../../src/stores/OrderStore';

describe('OrderStore', () => {
  test('orderStore', () => {
    const orderStore = new OrderStore();

    expect(orderStore.amount('jel1y')).toBe(50_000);

    orderStore.order('jel1y', '피카츄', '젤리세트', 10_000);

    expect(orderStore.amount('jel1y')).toBe(40_000);
  });
});
