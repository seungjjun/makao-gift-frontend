Feature('상품 세부 정보 확인 - 고객은 상품을 구매하기 위해 상품의 세부 정보를 확인할 수 있다.');

// Given
Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('올바르게 상품 정보를 확인', ({ I }) => {
  // Given
  I.click('스토어');

  // When
  I.click('[type=button]');

  // Then
  I.see('제조사 킹왕짱젤리');
});

Scenario('상품의 개수를 늘려 총 상품금액이 올바르게 늘어난것을 확인할 수 있다.', ({ I }) => {
  // Given
  I.click('스토어');

  // When
  I.click('[type=button]');

  I.see('10,000원');

  I.click('+');

  // Then
  I.see('총 상품금액: 20,000원');
});
