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
}

export const apiService = new ApiService();
