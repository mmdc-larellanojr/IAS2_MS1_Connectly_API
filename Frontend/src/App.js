import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import NewsFeed from './components/NewsFeed';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { isLoggedIn, logout, user } = useAuth();

  return (
    <div>
      <header>
        <h1>Connectly</h1>
        {isLoggedIn && (
          <div>
            <span>Welcome, {user?.username}</span>
            <button onClick={logout}>Logout</button>
          </div>
        )}
      </header>
      <main>
        <Routes>
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<NewsFeed />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
