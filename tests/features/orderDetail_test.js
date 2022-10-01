Feature('주문 세부 정보 확인 - 고객은 자신이 선물한 상품과 메세지를 자세히 알기 위해 주문 세부 정보를 확인할 수 있다.');

// Given
Before(({ I }) => {
  I.amOnPage('/');

  I.login('jel1y');

  // 주문 내역 세팅 → 주문 내역 1개 (제조사: 킹왕짱젤리, 상품 이름: 젤리세트  상품 금액: 10,000원)
});

Scenario('주문 상세페이지를 확인한다', ({ I }) => {
  // When
  I.click('주문조회');
  I.click('젤리세트');

  // Then
  I.see('구매수량\t1');
  I.see('총 상품금액\t10,000원');
});