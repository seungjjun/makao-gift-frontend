Feature('주문 목록 확인 - 고객은 자신이 선물한 이력을 확인하기 위해 주문 목록을 확인할 수 있다.');

// Given
Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('로그인 하지 않고 주문 내역을 클릭할 경우', ({ I }) => {
  // When
  I.click('주문조회');

  // Then
  I.see('USER LOGIN');
});

Scenario('주문 내역이 없는 경우', ({ I }) => {
  // Given
  // I.login('로그인');
  I.setupDatabase();
  I.amOnPage('/');

  // When
  I.click('주문조회');

  // Then
  I.see('내가 주문한 내역이 없습니다');
});

Scenario('주문 내역이 존재하는 경우 (한 페이지 분량)', ({ I }) => {
  // 주문 내역 세팅 5개
  // I.login('로그인');
  I.order({ receiver: '노승준', address: '서울 종로', message: '선물이야' });

  // When
  // I.click('주문조회');

  // Then
  I.see('내가 주문한 내역입니다');
  I.see('To.노승준');
});

Scenario('주문 내역이 존재하는 경우 (여러 페이지 분량)', ({ I }) => {
  // 주문 내역 세팅 10개

  // I.login('로그인');

  // When
  I.click('주문조회');

  // Then
  I.see('내가 주문한 내역입니다');
  I.see('2');
});
