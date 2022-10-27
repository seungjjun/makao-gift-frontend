/* global actor */

const backdoorBaseUrl = 'http://localhost:8000/backdoor';

module.exports = () => actor({
  setupDatabase() {
    this.amOnPage(`${backdoorBaseUrl}/setup-database`);
  },

  settingProduct() {
    this.amOnPage(`${backdoorBaseUrl}/setting-product`);
  },

  deleteProduct() {
    this.amOnPage(`${backdoorBaseUrl}/delete-product`);
  },

  order({ receiver, address, message }) {
    this.setupDatabase();

    this.amOnPage('/');

    this.click('스토어');

    this.click('[type=button]');

    this.click('선물하기');

    this.fillField('받는 분 성함', receiver);
    this.fillField('받는 분 주소', address);
    this.fillField('받는 분께 보내는 메세지', message);

    this.click('[type=submit]');
  },

  settingTransactions() {
    this.amOnPage(`${backdoorBaseUrl}/setting-transactions`);
  },

  login() {
    this.click('로그인');

    this.fillField('아이디', 'jel1y');
    this.fillField('비밀번호', 'password');
  },
});
