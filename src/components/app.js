import React from 'react';
import Login from './Login';
import Profile from './Profile';
import Reservation from './Reservation';
import Calendar from './Calendar';
import Register from './Register';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider, AuthContext } from './AuthContext';

const AuthHandler = () => {
  const user = React.useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (user) {
      if (location.pathname !== "/profile") {
        navigate('/profile');
      }
    } else {
      if (location.pathname !== "/login" && location.pathname !== "/register") {
        navigate('/login');
      }
    }
  }, [navigate, location, user]);

  return null;
};

const App = () => {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
};

export default App;
