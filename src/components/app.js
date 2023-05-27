import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import Login from './Login';
import Profile from './Profile';
import Reservation from './Reservation';
import Calendar from './Calendar';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (!user) {
    return <Login />;
  }

  return (
    <div>
      <Profile user={user} />
      <Reservation user={user} />
      <Calendar user={user} />
    </div>
  );
};

export default App;
