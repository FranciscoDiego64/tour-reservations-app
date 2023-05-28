import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { AuthContext } from './AuthContext';

const Profile = () => {
  const navigate = useNavigate();
  const user = useContext(AuthContext);

  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchData = async (retryCount = 0) => {
      if (user) {
        
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        console.log('Firestore document snapshot: ', docSnap);

        if (docSnap.exists()) {
          console.log('Document data: ', docSnap.data());
          setDisplayName(docSnap.data().displayName);
          setUsername(docSnap.data().username);
        } else {
          console.log('No such document! Retrying...');
          if (retryCount < 3) {
            setTimeout(() => fetchData(retryCount + 1), 2000);
          } else {
            console.log('Failed to fetch user document after 3 retries.');
          }
        }
      }
    };

    fetchData();
  }, [user]);

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
      <h2>Hello {displayName}!</h2>
      <h3>This is your profile page</h3>
      {user ? <p>Email: {user.email}</p> : <p>No user is signed in</p>}
      <p>Display Name: {displayName}</p>
      {/*<p>Username: {username}</p>*/}
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default Profile;
