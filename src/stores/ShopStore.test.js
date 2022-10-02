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
  describe('login', () => {
    context('올바른 아이디와 비밀번호를 입력했을 경우', () => {
      it('아이디 정보를 불러옴', async () => {
        const shopStore = new ShopStore();

        await shopStore.login({ id: 'jel1y', password: 'Qwe1234!' });

        expect(shopStore.name).toBe('노승준');
        expect(shopStore.amount).toBe(50_000);
      });
    });

    context('아이디가 틀렸을 경우', () => {
      it('아이디 정보를 불러옴', async () => {
        const shopStore = new ShopStore();

        await shopStore.login({ id: 'xxx', password: 'Qwe1234!' });

        expect(shopStore.name).toBeFalsy();
        expect(shopStore.amount).toBe(0);
      });
    });
  });
});
