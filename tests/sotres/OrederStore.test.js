import OrderStore from '../../src/stores/OrderStore';

const context = describe;

describe('OrderStore', () => {
  let orderStore;

  beforeEach(() => {
    orderStore = new OrderStore();
  });

  context('when fetch User Information', () => {
    it('user information with correct', async () => {
      await orderStore.fetchUser();

      expect(orderStore.amount).toBe(50_000);
      expect(orderStore.name).toBe('노승준');
    });
  });
});
