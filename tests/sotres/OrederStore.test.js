import OrderStore from '../../src/stores/OrderStore';

describe('OrderStore', () => {
  test('orderStore', () => {
    const orderStore = new OrderStore();

    expect(orderStore.amount('jel1y')).toBe(50_000);

    orderStore.order('jel1y', '피카츄', '서울 종로', '받아랏');

    expect(orderStore.address).toBe('서울 종로');
  });
});
