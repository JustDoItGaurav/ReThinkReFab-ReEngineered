// src/contexts/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config'; // We'll create this next

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This listener is the magic of Firebase Auth
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe; // Cleanup on unmount
  }, []);

  const value = {
    currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}