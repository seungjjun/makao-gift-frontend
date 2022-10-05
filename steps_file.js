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
});
