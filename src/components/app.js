import React from 'react';
import Login from './Login';
import Profile from './Profile';
import Reservation from './Reservation';
import Calendar from './Calendar';

const App = () => {
  return (
    <div>
      <Login />
      <Profile />
      <Reservation />
      <Calendar />
    </div>
  );
};

export default App;
