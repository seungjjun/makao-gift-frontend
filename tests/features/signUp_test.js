Feature('회원가입 - 고객은 상품을 주문할 수 있는 자격을 얻기 위해 회원가입을 할 수 있다.');

// Given
Before(({ I }) => {
  I.amOnPage('/');

  I.click('회원가입');

  I.see('SIGN UP');
});

Scenario('올바르게 개인 정보를 입력한 경우', ({ I }) => {
  // When
  I.fillField('이름 :', '노승준');
  I.fillField('아이디 :', 'jel1y');
  I.fillField('비밀번호 :', 'Qwe1234!');
  I.fillField('비밀번호 확인 :', 'Qwe1234!');

  // 회원가입 버튼을 클릭하여 제출
  I.click('[type=submit]');

  // Then
  I.see('회원가입 완료');
});

Scenario('이름만 입력하지 않을 경우', ({ I }) => {
  // When
  I.fillField('아이디 :', 'jel1y');
  I.fillField('비밀번호 :', 'Qwe1234!');
  I.fillField('비밀번호 확인 :', 'Qwe1234!');

  // 회원가입 버튼을 클릭하여 제출
  I.click('[type=submit]');

  // Then
  I.see('이름을 입력해주세요');
});

Scenario('아이디만 입력하지 않을 경우', ({ I }) => {
  // When
  I.fillField('이름 :', '노승준');
  I.fillField('비밀번호 :', 'Qwe1234!');
  I.fillField('비밀번호 확인 :', 'Qwe1234!');

  // 회원가입 버튼을 클릭하여 제출
  I.click('[type=submit]');

  // Then
  I.see('아이디를 입력해주세요');
});

Scenario('비밀번호만 입력하지 않을 경우', ({ I }) => {
  // When
  I.fillField('이름 :', '노승준');
  I.fillField('아이디 :', 'jel1y');

  // 회원가입 버튼을 클릭하여 제출
  I.click('[type=submit]');

  // Then
  I.see('비밀번호를 입력해주세요');
});

Scenario('확인 비밀번호만 입력하지 않을 경우', ({ I }) => {
  // When
  I.fillField('이름 :', '노승준');
  I.fillField('아이디 :', 'jel1y');
  I.fillField('비밀번호 :', 'Qwe1234!');

  // 회원가입 버튼을 클릭하여 제출
  I.click('[type=submit]');

  // Then
  I.see('비밀번호가 일치하지 않습니다');
});

Scenario('이미 존재하는 아이디를 입력할 경우', ({ I }) => {
  // Given (회원가입 세팅)
  I.fillField('이름 :', '노승준');
  I.fillField('아이디 :', 'jel1y');
  I.fillField('비밀번호 :', 'Qwe1234!');
  I.fillField('비밀번호 확인 :', 'Qwe1234!');

  I.click('[type=submit]');

  I.amOnPage('/');

  I.click('회원가입');

  // When
  I.fillField('이름 :', '노승준');
  I.fillField('아이디 :', 'jel1y');
  I.fillField('비밀번호 :', 'Qwe1234!');
  I.fillField('비밀번호 확인 :', 'Qwe1234!');

  // 회원가입 버튼을 클릭하여 제출
  I.click('[type=submit]');

  // Then
  I.see('해당 아이디는 사용할 수 없습니다');
});

Scenario('이름을 요구사항(길이)에 맞지 않게 입력한 경우', ({ I }) => {
  // When
  I.fillField('이름 :', '이게몇글자로보이나요');
  I.fillField('아이디 :', 'jel1y');
  I.fillField('비밀번호 :', 'Qwe1234!');
  I.fillField('비밀번호 확인 :', 'Qwe1234!');

  // 회원가입 버튼을 클릭하여 제출
  I.click('[type=submit]');

  // Then
  I.see('이름을 다시 확인해주세요');
});

Scenario('아이디를 요구사항에 맞지 않게 입력한 경우', ({ I }) => {
  // When
  I.fillField('이름 :', '노승준');
  I.fillField('아이디 :', '1111-1111-1111');
  I.fillField('비밀번호 :', 'Qwe1234!');
  I.fillField('비밀번호 확인 :', 'Qwe1234!');

  // 회원가입 버튼을 클릭하여 제출
  I.click('[type=submit]');

  // Then
  I.see('아이디를 다시 확인해주세요');
});

Scenario('비밀번호를 요구사항에 맞지 않게 입력한 경우', ({ I }) => {
  // When
  I.fillField('이름 :', '노승준');
  I.fillField('아이디 :', 'jel1y');
  I.fillField('비밀번호 :', '1234');
  I.fillField('비밀번호 확인 :', '1234');

  // 회원가입 버튼을 클릭하여 제출
  I.click('[type=submit]');

  // Then
  I.see('비밀번호를 다시 확인해주세요');
});

Scenario('확인 비밀번호를 맞지 않게 입력한 경우', ({ I }) => {
  // When
  I.fillField('이름 :', '노승준');
  I.fillField('아이디 :', 'jel1y');
  I.fillField('비밀번호 :', 'Qwe1234!');
  I.fillField('비밀번호 확인 :', '1234');

  // 회원가입 버튼을 클릭하여 제출
  I.click('[type=submit]');

  // Then
  I.see('비밀번호가 일치하지 않습니다');
});
