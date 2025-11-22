import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles/index.scss';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ArticlePage from './pages/ArticlePage';
import QuizPage from './pages/QuizPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { isAuthenticated } from './utils/auth';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={isAuthenticated() ? <Navigate to="/" replace /> : <LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/articles/:id"
          element={
            <ProtectedRoute>
              <ArticlePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/test/:id"
          element={
            <ProtectedRoute>
              <QuizPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to={isAuthenticated() ? '/' : '/login'} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
