// src/pages/SignUpPage.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import Navbar from '../components/Navbar';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/'); // Redirect to homepage on success
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 pt-20">
        <div className="max-w-md w-full bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-6">Create an Account</h2>
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
            <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors">Sign Up</button>
          </form>
          <p className="text-center mt-4 text-slate-600 dark:text-slate-400">
            Already have an account? <Link to="/login" className="text-green-500 hover:underline">Log In</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;