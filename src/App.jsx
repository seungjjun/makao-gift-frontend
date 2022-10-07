import { Routes, Route } from 'react-router-dom';

import { useEffect } from 'react';

import { productStore } from './stores/ProductStore';

import { shopStore } from './stores/ShopStore';

import Header from './components/Header';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import OrderPage from './pages/OrderPage';
import OrdersPage from './pages/OrdersPage';
import OrdersDetailPage from './pages/OrdersDetailPage';

export default function App() {
  useEffect(() => {
    productStore.fetchProducts(1);
    productStore.pagination();
    shopStore.fetchTransactions(1);
    shopStore.pagination();
  }, []);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
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
    </div>
  );
}
