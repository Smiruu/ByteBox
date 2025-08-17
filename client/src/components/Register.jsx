import React, { useState } from 'react';
import { auth, db } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {setDoc, doc} from "firebase/firestore"

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('')
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser
      console.log(user)// Redirect after successful registration
      if(user){
        await setDoc(doc(db, "Users",user.uid), {
            email:user.email,
            username: name,
            createdAt: new Date(),
        })
      }
      navigate("/")
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
   <div className="auth-container">
      <h2>Register</h2>
      {error && (
        <div className="error-message" role="alert">
          <strong>Error:</strong>
          <span> {error}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your name"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Create a password"
            minLength="6"
            className="form-input"
          />
        </div>
        <div className="form-actions">
          <button
            type="submit"
            disabled={loading}
            className="auth-button"
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </div>
      </form>
      <p className="auth-link-text">
        Already have an account? <a href="/login" className="auth-link">Login here</a>
      </p>
    </div>
  );
};

export default Register;