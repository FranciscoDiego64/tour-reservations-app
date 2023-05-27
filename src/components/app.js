import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import Login from './Login';
import Profile from './Profile';
import Reservation from './Reservation';
import Calendar from './Calendar';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';

const AuthHandler = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      setUser(userAuth);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if(user) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  return null;
};

const App = () => {
  return (
    <Router>
      <AuthHandler />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reservations" element={<Reservation />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </Router>
  );
};

export default App;
//f