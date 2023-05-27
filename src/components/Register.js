import React, { useState } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      navigate('/profile'); // Redirect to profile page after registration
    } catch (error) {
      setErrorMessage(error.message);
    }
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
      <input type="submit" value="Register" />
    </form>
  );
};

export default Register;
