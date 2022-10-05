/* eslint-disable class-methods-use-this */

export default class ApiService {
  async postLogin({ id, password }) {
    if (id === 'jel1y' && password === 'Qwe1234!') {
      return {
        accessToken: 'ACCESS.TOKEN',
        name: '노승준',
        amount: 50_000,
      };
    }
    throw new Error('아이디 혹은 비밀번호가 맞지 않습니다');
  }

  async fetchProduct(id) {
    if (id === 1) {
      return {
        id: 1, manufacturer: '킹왕짱젤리', name: '젤리세트', option: '대왕젤리2개포함한', price: 10_000,
      };
    }
    return '';
  }
}

export const apiService = new ApiService();
