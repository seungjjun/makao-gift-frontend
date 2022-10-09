import { Link, useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import Amount from './Amount';

export default function Header() {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  const handleClickLogout = () => {
    setAccessToken('');
    navigate('/');
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            선물하기
          </li>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/products?page=1">스토어</Link>
          </li>
          <li>
            <Link to="/orders?page=1">주문조회</Link>
          </li>
          {accessToken ? (
            <>
              <Amount />
              <button
                type="button"
                onClick={handleClickLogout}
              >
                로그아웃
              </button>
            </>
          ) : (
            <ul>
              <li>
                <Link to="/signup">회원가입</Link>
              </li>
              <li>
                <Link to="/login">로그인</Link>
              </li>
            </ul>
          )}
        </ul>
      </nav>
    </header>
  );
}
