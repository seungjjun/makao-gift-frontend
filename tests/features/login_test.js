Feature('로그인 - 고객은 자신임을 증명하기 위해 로그인할 수 있다.');

// Given
Before(({ I }) => {
  I.amOnPage('/');

  I.click('로그인');
});

Scenario('유효한 정보를 입력해서 로그인에 성공한 경우', ({ I }) => {
  // When
  I.fillField('아이디', 'jel1y');
  I.fillField('비밀번호', 'password');

  I.click('로그인하기');

  // Then
  I.see('로그아웃');
});

Scenario('잘못된 아이디를 입력한 경우', ({ I }) => {
  // When
  I.fillField('아이디', 'xxxx');
  I.fillField('비밀번호', 'password');

  I.click('로그인하기');

  // Then
  I.see('아이디 혹은 비밀번호가 맞지 않습니다');
});

Scenario('잘못된 비밀번호를 입력한 경우', ({ I }) => {
  // When
  I.fillField('아이디', 'jel1y');
  I.fillField('비밀번호', '1234');

  I.click('로그인하기');

  // Then
  I.see('아이디 혹은 비밀번호가 맞지 않습니다');
});

Scenario('아이디를 입력하지 않았을 경우', ({ I }) => {
  // When
  I.fillField('비밀번호', '1234');

  I.click('로그인하기');

  // Then
  I.see('아이디를 입력해주세요');
});

Scenario('비밀번호를 입력하지 않았을 경우', ({ I }) => {
  // When
  I.fillField('아이디', 'jel1y');

  I.click('로그인하기');

  // Then
  I.see('비밀번호를 입력해주세요');
});
