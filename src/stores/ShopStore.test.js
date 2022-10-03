import server from '../testServer';

import ShopStore from './ShopStore';

const context = describe;

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe('ShopStore', () => {
  let shopStore;

  beforeEach(() => {
    shopStore = new ShopStore();
  });

  describe('login', () => {
    context('올바른 아이디와 비밀번호를 입력했을 경우', () => {
      it('아이디 정보를 불러옴', async () => {
        await shopStore.login({ id: 'jel1y', password: 'Qwe1234!' });

        expect(shopStore.name).toBe('노승준');
        expect(shopStore.amount).toBe(50_000);
      });
    });

    context('아이디가 틀렸을 경우', () => {
      it('정보를 불러오지 못한다.', async () => {
        await shopStore.login({ id: 'xxx', password: 'Qwe1234!' });

        expect(shopStore.name).toBeFalsy();
        expect(shopStore.amount).toBe(0);
      });
    });

    context('비밀번호가 틀렸을 경우', () => {
      it('정보를 불러오지 못한다.', async () => {
        await shopStore.login({ id: 'jel1y', password: '1234!' });

        expect(shopStore.name).toBeFalsy();
        expect(shopStore.amount).toBe(0);
      });
    });
  });

  describe('fetchUser', () => {
    it('유저의 정보를 불러옴', async () => {
      await shopStore.fetchUser();

      expect(shopStore.amount).toBe(50_000);
    });
  });
});
