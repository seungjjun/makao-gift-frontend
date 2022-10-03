Feature('홈 페이지');

// Given
Before(({ I }) => {
  I.setupDatabase();
});

Scenario('로그인 되었을 경우 내 잔액을 확인할 수 있다.', ({ I }) => {
  // When
  I.amOnPage('/');

  // Then
  I.see('Hello, world!');

  I.see('내 잔액: 50,000원');
});
