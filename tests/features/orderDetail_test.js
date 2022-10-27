Feature('주문 세부 정보 확인 - 고객은 자신이 선물한 상품과 메세지를 자세히 알기 위해 주문 세부 정보를 확인할 수 있다.');

// Given
Before(({ I }) => {
  I.amOnPage('/');

  I.login();
});

Scenario('주문 상세페이지를 확인한다', ({ I }) => {
  // When
  I.click('주문조회');

  I.click('[type=button]');

  // Then
  I.see('구매수량 1');
  I.see('총 상품금액 10,000원');
});
