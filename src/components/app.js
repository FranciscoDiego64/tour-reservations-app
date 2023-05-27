import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import Login from './Login';
import Profile from './Profile';
import Reservation from './Reservation';
import Calendar from './Calendar';
import Register from './Register';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

const AuthHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, userAuth => {
      setUser(userAuth);
      if(userAuth) {
        if (location.pathname !== "/profile") {
          navigate('/profile');
        }
      } else {
        if (location.pathname !== "/login" && location.pathname !== "/register") {
          navigate('/login');
        }
      }
    });

    return () => unsubscribe();
  }, [navigate, location]);

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
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
