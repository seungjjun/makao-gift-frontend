import { Link, useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import styled from 'styled-components';

import useOrderStore from '../hooks/useOrderStore';

import Amount from './Amount';

const MenuBar = styled.header`
  width: 100%;
  margin-top: 1.5em;
  padding-bottom: 1em;
  border-bottom: 1px solid #CCC;
`;

const MenuButtonList = styled.nav`
  display: flex;
  width: 50%;
  margin: auto;
  justify-content: space-between;
`;

const MenuButtons = styled.ul`
  display: flex;
  gap: 2.4em;

  li:nth-child(1) {
    font-size: 1.4em;
  }
`;

const LogoutButton = styled.ul`
  display: flex;
  gap: 2.4em;

  button {
    margin-bottom: .3em;
    border: none;
    background: #fff;
  }
`;

const UserMenuButtons = styled.ul`
  display: flex;
  gap: 3em;
`;

export default function Header() {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  const orderStore = useOrderStore();

  const handleClickLogout = () => {
    setAccessToken('');
    navigate('/');
  };

  return (
    <MenuBar>
      <MenuButtonList>
        <MenuButtons>
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
        </MenuButtons>
        {accessToken ? (
          <LogoutButton>
            <Amount orderStore={orderStore} />
            <button
              type="button"
              onClick={handleClickLogout}
            >
              로그아웃
            </button>
          </LogoutButton>
        ) : (
          <UserMenuButtons>
            <li>
              <Link to="/signup">회원가입</Link>
            </li>
            <li>
              <Link to="/login">로그인</Link>
            </li>
          </UserMenuButtons>
        )}
      </MenuButtonList>
    </MenuBar>
  );
}
