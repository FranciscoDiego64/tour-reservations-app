import React from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';

const Profile = ({ user }) => {
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      history.push('/login'); // Redirect to login page
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default Profile;
