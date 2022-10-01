Feature('home');

Scenario('test something', ({ I }) => {
  // When
  I.amOnPage('/');

  I.see('Hello, world!');
});
