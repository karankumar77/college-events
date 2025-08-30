import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Events from './pages/Events.jsx';
import Notices from './pages/Notices.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { setAuthToken } from './services/api.js';
export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));
  const navigate = useNavigate();
  useEffect(() => { setAuthToken(token); }, [token]);
  const logout = () => {
    localStorage.removeItem('token'); localStorage.removeItem('role');
    setToken(null); setRole(null); navigate('/login');
  };
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 16 }}>
      <nav style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <Link to="/">Events</Link>
        <Link to="/notices">Notices</Link>
        {token ? (<button onClick={logout}>Logout</button>) : (<Link to="/login">Login</Link>)}
      </nav>
      <Routes>
        <Route path="/login" element={<Login onLogin={(t, r) => { setToken(t); setRole(r); localStorage.setItem('token', t); localStorage.setItem('role', r); }} />} />
        <Route path="/" element={<ProtectedRoute isAuthed={!!token}><Events role={role} /></ProtectedRoute>} />
        <Route path="/notices" element={<ProtectedRoute isAuthed={!!token}><Notices role={role} /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}
