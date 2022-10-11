import { Routes, Route } from 'react-router-dom';

import { useEffect } from 'react';

import { useLocalStorage } from 'usehooks-ts';

import { Reset } from 'styled-reset';

import styled from 'styled-components';

import { apiService } from './services/ApiService';

import { productStore } from './stores/ProductStore';

import { shopStore } from './stores/ShopStore';

import GlobalStyle from './styles/GlobalStyle';

import Header from './components/Header';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import OrderPage from './pages/OrderPage';
import OrdersPage from './pages/OrdersPage';
import OrdersDetailPage from './pages/OrdersDetailPage';
import WelcomePage from './pages/WelcomePage';

import useOrderStore from './hooks/useOrderStore';

const Container = styled.div`
  max-width: 1920px;
  min-width: 1024px;
  min-height: 100vh;
  margin: auto;
`;

export default function App() {
  const orderStore = useOrderStore();

  const [accessToken] = useLocalStorage('accessToken', '');

  useEffect(() => {
    apiService.setAccessToken(accessToken);

    if (accessToken) {
      orderStore.fetchUser();
    }
  }, [accessToken]);

  useEffect(() => {
    productStore.fetchProducts(1);
    productStore.pagination();

    if (accessToken) {
      shopStore.fetchTransactions(1);
      shopStore.pagination();
    }
  }, []);

  return (
    <Container>
      <Reset />
      <GlobalStyle />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products?page=1" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders?page=1" element={<OrderPage />} />
          <Route path="/orders/:id" element={<OrdersDetailPage />} />
        </Routes>
      </main>
    </Container>
  );
}
