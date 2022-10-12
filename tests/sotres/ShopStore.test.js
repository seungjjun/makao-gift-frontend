import ShopStore from '../../src/stores/ShopStore';

const context = describe;

describe('ShopStore', () => {
  let shopStore;

  beforeEach(() => {
    shopStore = new ShopStore();
  });

  describe('login', () => {
    context('올바른 아이디와 비밀번호를 입력했을 경우', () => {
      it('아이디 정보를 불러옴', async () => {
        await shopStore.login({ userId: 'jel1y', password: 'password' });

        expect(shopStore.amount).toBe(50_000);
      });
    });

    context('아이디가 틀렸을 경우', () => {
      it('정보를 불러오지 못한다.', async () => {
        await shopStore.login({ userId: 'xxx', password: 'password' });

        expect(shopStore.name).toBeFalsy();
        expect(shopStore.amount).toBe(0);
      });
    });

    context('비밀번호가 틀렸을 경우', () => {
      it('정보를 불러오지 못한다.', async () => {
        await shopStore.login({ userId: 'jel1y', password: '1234!' });

        expect(shopStore.name).toBeFalsy();
        expect(shopStore.amount).toBe(0);
      });
    });

    context('아이디가 빈칸일 경우', () => {
      it('에러메세지를 확인할 수 있다.', async () => {
        await shopStore.login({ userId: '', password: '1234!' });

        expect(shopStore.errorMessage).toBe('아이디를 입력해주세요');
      });
    });

    context('비밀번호가 빈칸일 경우', () => {
      it('에러메세지를 확인할 수 있다.', async () => {
        await shopStore.login({ userId: 'jel1y', password: '' });

        expect(shopStore.errorMessage).toBe('비밀번호를 입력해주세요');
      });
    });
  });

  describe('register', () => {
    context('회원가입이 성공할 경우', () => {
      it('회원가입시 입력한 이름을 불러온다', async () => {
        await shopStore.register({
          name: '노승준', userId: 'jel1y', password: 'Qwe1234!', confirmPassword: 'Qwe1234!',
        });

        expect(shopStore.name).toBe('노승준');
      });
    });

    context('이름을 입력하지 않았을 경우', () => {
      it('회원가입에 실패한다.', async () => {
        await shopStore.register({
          name: '', userId: 'jel1y', password: 'Qwe1234!', confirmPassword: 'Qwe1234!',
        });

        expect(shopStore.errorMessage).toBe('이름을 입력해주세요');
      });
    });

    context('아이디를 입력하지 않았을 경우', () => {
      it('회원가입에 실패한다.', async () => {
        await shopStore.register({
          name: '노승준', userId: '', password: 'Qwe1234!', confirmPassword: 'Qwe1234!',
        });

        expect(shopStore.errorMessage).toBe('아이디를 입력해주세요');
      });
    });

    context('비밀번호를 입력하지 않았을 경우', () => {
      it('회원가입에 실패한다.', async () => {
        await shopStore.register({
          name: '노승준', userId: 'jel1y', password: '', confirmPassword: 'Qwe1234!',
        });

        expect(shopStore.errorMessage).toBe('비밀번호를 입력해주세요');
      });
    });

    context('확인 비밀번호를 입력하지 않았을 경우', () => {
      it('회원가입에 실패한다.', async () => {
        await shopStore.register({
          name: '노승준', userId: 'jel1y', password: 'Qwe1234!', confirmPassword: '',
        });

        expect(shopStore.errorMessage).toBe('비밀번호를 입력해주세요');
      });
    });
  });

  describe('fetchTransaction', () => {
    context('특정 주문 내역을 불러올 때', () => {
      it('아이디가 1인 주문 내역을 불러온다.', async () => {
        await shopStore.fetchTransaction(1);

        const { transaction } = shopStore;

        expect(transaction).toBeTruthy();
        expect(transaction.receiver).toBe('노승준');
        expect(transaction.manufacturer).toBe('빙그레');
      });
    });

    context('주문내역을 여러개 가져올 때', () => {
      it('한페이지 분량의 주문내역(8개)을 가져온다.', async () => {
        await shopStore.fetchTransactions(1);

        const { transactions } = shopStore;

        expect(transactions).toBeTruthy();
        expect(transactions).toHaveLength(8);
      });
    });

    context('주문내역을 여러개 가져올 때', () => {
      it('두번째 페이지의 주문 내역(1개)을 가져온다.', async () => {
        await shopStore.fetchTransactions(2);

        const { transactions } = shopStore;

        expect(transactions).toBeTruthy();
        expect(transactions).toHaveLength(1);
      });
    });
  });
});
