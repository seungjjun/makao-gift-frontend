Feature('상품 목록 확인 - 고객은 마음에 드는 상품을 고르기 위해 상품 목록을 볼 수 있다.');

// Given
Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('스토어에 상품이 존재하지 않을 경우', ({ I }) => {
  // When
  I.click('스토어');

  // Then
  I.see('상품이 존재하지 않습니다');
});

Scenario('스토어에 상품이 8개 이하로 존재할 경우', ({ I }) => {
  // Given
  // 상품 세팅 1개 (제조사: 킹왕짱젤리  상품 이름: 젤리세트  상품 금액: 10,000원)

  // When
  I.click('스토어');

  // Then
  I.see('킹왕짱젤리');
});

Scenario('스토어에 상품이 8개 이상 존재할 경우', ({ I }) => {
  // Given
  // 상품 세팅 9개

  // When
  I.click('스토어');

  I.see('2');
  I.click('2');

  // Then
//   I.see('')
});
