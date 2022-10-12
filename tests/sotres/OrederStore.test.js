import OrderStore from '../../src/stores/OrderStore';

const context = describe;

describe('OrderStore', () => {
  let orderStore;

  beforeEach(() => {
    orderStore = new OrderStore();

    orderStore.manufacturer = '뉴발란스';
    orderStore.productName = 'ML725P (GRAY)';
    orderStore.option = '2022 ALL / 남 여';
    orderStore.productNumber = 1;
    orderStore.price = 20000;
    orderStore.image = 'img';
  });

  describe('fetchUser', () => {
    context('when fetch User Information', () => {
      it('user information with correct', async () => {
        await orderStore.fetchUser();

        expect(orderStore.amount).toBe(50_000);
        expect(orderStore.name).toBe('노승준');
      });
    });
  });

  describe('order', () => {
    context('when order information is correct', () => {
      it('', async () => {
        await orderStore.order('jel1y', '노승준', '성북구 정릉동', 'testMessage');

        expect(orderStore.manufacturer).toBe('뉴발란스');
        expect(orderStore.productName).toBe('ML725P (GRAY)');
        expect(orderStore.price).toBe(20_000);
      });
    });

    context('when receiver is blank', () => {
      it('appear error message', async () => {
        await orderStore.order('jel1y', '', '성북구 정릉동', 'testMessage');

        expect(orderStore.errorMessage).toBe('성함을 입력해주세요');
      });
    });

    context('when address is blank', () => {
      it('appear error message', async () => {
        await orderStore.order('jel1y', '노승준', '', 'testMessage');

        expect(orderStore.errorMessage).toBe('주소를 입력해주세요');
      });
    });
  });
});
