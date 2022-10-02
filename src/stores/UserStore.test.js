import UserStore from './UserStore';

describe('UserStore', () => {
  test('create id', () => {
    const userStore = new UserStore({
      id: 'jel1y',
      name: '노승준',
      amount: 50_000,
    });

    expect(userStore.id).toBe('jel1y');
    expect(userStore.name).toBe('노승준');
    expect(userStore.amount).toBe(50_000);
  });
});
