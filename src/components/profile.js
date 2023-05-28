import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Profile = () => { // Remove user prop here
  const navigate = useNavigate();
  const user = auth.currentUser;

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
      {user ? <p>Email: {user.email}</p> : <p>No user is signed in</p>}
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default Profile;
