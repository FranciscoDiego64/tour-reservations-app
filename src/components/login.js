import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setErrorMessage('');
      navigate('/profile'); // Redirect to profile page after login
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <p>{errorMessage}</p>}
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </label>
      <input type="submit" value="Log in" />
      <p>Don't have an account? <Link to="/register">Register here bro</Link>.</p>
    </form>
  );
};

export default Login;



