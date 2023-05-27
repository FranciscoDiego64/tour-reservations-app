import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Profile = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login page after logout
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
//f