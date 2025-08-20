// src/pages/LoginPage.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase/config';
import Navbar from '../components/Navbar';
import { FaGoogle } from 'react-icons/fa';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError("Failed to log in. Please check your credentials.");
    }
  };
  
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (err) {
      setError("Failed to sign in with Google.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 pt-20">
        <div className="max-w-md w-full bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-6">Log In</h2>
          {error && <p className="bg-red-500 text-white p-3 rounded mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-slate-600 dark:text-slate-400 mb-2">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg focus:outline-none" required />
            </div>
            <div className="mb-6">
              <label className="block text-slate-600 dark:text-slate-400 mb-2">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg focus:outline-none" required />
            </div>
            <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors mb-4">Log In</button>
          </form>
          <button onClick={handleGoogleSignIn} className="w-full bg-white dark:bg-slate-700 text-slate-800 dark:text-white font-bold py-3 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 flex items-center justify-center gap-2 transition-colors">
            <FaGoogle /> Sign In with Google
          </button>
          <p className="text-center mt-4 text-slate-600 dark:text-slate-400">
            Need an account? <Link to="/signup" className="text-green-500 hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;