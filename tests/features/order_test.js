Feature('상품 주문 - 고객은 상품을 친구에게 보내기 위해 주문을 완료 할 수 있다.');

// Given
Before(({ I }) => {
  I.setupDatabase();

  I.amOnPage('/');
});

// Scenario('로그인 하지 않고 선물을 할 경우', ({ I }) => {
//   // When
//   I.click('스토어');

//   I.click('[type=button]');

//   I.click('선물하기');

//   // Then
//   I.see('USER LOGIN');
// });

// Scenario('로그인 후 선물하기 페이지를 확인', ({ I }) => {
//   // Given
//   // 백도어 api 설정 후 steps파일에서 설정 필요
//   // I.login('로그인');

//   I.click('스토어');

//   I.click('[type=button]');

//   // When

//   I.click('선물하기');

//   // Then
//   I.see('받는 분 성함');
// });

Scenario('올바르게 선물이 된 경우', ({ I }) => {
  // Given
  // 백도어 api 설정 후 steps파일에서 설정 필요
  // I.login('로그인');

  I.click('스토어');

  I.click('[type=button]');

  // When
  I.click('선물하기');
  I.fillField('받는 분 성함', '노승준');
  I.fillField('받는 분 주소', '서울특별시');
  I.fillField('받는 분께 보내는 메세지', '받아랏');

  I.click('[type=submit]');

  // Then
  I.see('내가 주문한 내역입니다');
});

Scenario('받는 분 성함을 입력하지 않은 경우', ({ I }) => {
  // Given
  // 백도어 api 설정 후 steps파일에서 설정 필요
  // I.login('로그인');

  I.click('스토어');

  I.click('[type=button]');

  // When
  I.click('선물하기');
  I.fillField('받는 분 주소', '서울특별시');
  I.fillField('받는 분께 보내는 메세지', '받아랏');

  // Then
  // 선물하기 버튼
  I.click('[type=submit]');

  I.see('받는 분 성함을 다시 확인해주세요');
});

Scenario('받는 분 주소를 입력하지 않은 경우', ({ I }) => {
  // Given
  // 백도어 api 설정 후 steps파일에서 설정 필요
  // I.login('로그인');

  I.click('스토어');

  I.click('[type=button]');

  // When
  I.click('선물하기');
  I.fillField('받는 분 성함', '노승준');
  I.fillField('받는 분께 보내는 메세지', '받아랏');

  // Then
  // 선물하기 버튼
  I.click('[type=submit]');

  I.see('주소를 입력해주세요');
});

Scenario('받는 분 성함을 잘못 입력한 경우', ({ I }) => {
  // Given
  // 백도어 api 설정 후 steps파일에서 설정 필요
  // I.login('로그인');

  I.click('스토어');

  I.click('[type=button]');

  // When
  I.click('선물하기');
  I.fillField('받는 분 성함', 'Jun');
  I.fillField('받는 분 주소', '서울특별시');
  I.fillField('받는 분께 보내는 메세지', '받아랏');

  // Then
  // 선물하기 버튼
  I.click('[type=submit]');

  I.see('받는 분 성함을 다시 확인해주세요');
});

Scenario('잔액이 모자란 채 선물하기를 진행할 경우', ({ I }) => {
  // Given
  // 백도어 api 설정 후 steps파일에서 설정 필요
  // I.login('로그인');

  I.click('스토어');

  I.click('[type=button]');

  // When
  I.fillField('구매수량', '6');

  I.click('선물하기');
  I.fillField('받는 분 성함', '노승준');
  I.fillField('받는 분 주소', '서울특별시');
  I.fillField('받는 분께 보내는 메세지', '받아랏');

  // Then
  // 선물하기 버튼
  I.click('[type=submit]');

  I.see('잔액이 부족하여 선물하기가 불가합니다');
});

Scenario('받는 분 성함의 글자가 7글자가 넘어갈 경우', ({ I }) => {
  // Given
  // 백도어 api 설정 후 steps파일에서 설정 필요
  // I.login('로그인');

  I.click('스토어');

  I.click('[type=button]');

  I.click('선물하기');

  // When
  I.fillField('받는 분 성함', '이건이름일까요아닐까요');
  I.fillField('받는 분 주소', '서울특별시');
  I.fillField('받는 분께 보내는 메세지', '받아랏');

  // Then
  // 선물하기 버튼
  I.click('[type=submit]');

  I.see('받는 분 성함을 다시 확인해주세요');
});

Scenario('받는 분께 보내는 메세지가 100글자가 넘어갈 경우', ({ I }) => {
  // Given
  // 백도어 api 설정 후 steps파일에서 설정 필요
  // I.login('로그인');

  I.click('스토어');

  I.click('[type=button]');

  I.click('선물하기');

  // When
  I.fillField('받는 분 성함', '노승준');
  I.fillField('받는 분 주소', '서울특별시');
  I.fillField(
    '받는 분께 보내는 메세지',
    '일이삼사오육칠팔구십'
  + '일이삼사오육칠팔구십'
  + '일이삼사오육칠팔구십'
  + '일이삼사오육칠팔구십'
  + '일이삼사오육칠팔구십'
  + '일이삼사오육칠팔구십'
  + '일이삼사오육칠팔구십'
  + '일이삼사오육칠팔구십'
  + '일이삼사오육칠팔구십'
  + '일이삼사오육칠팔구십끝',
  );

  // Then
  // 선물하기 버튼
  I.click('[type=submit]');

  I.see('보내는 메시지가 너무 깁니다.');
});
