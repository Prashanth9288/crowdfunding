import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { auth } from '../lib/firebase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sync user with backend after login/signup
  const syncUserWithBackend = async (firebaseUser, additionalData = {}) => {
      try {
          const response = await fetch('http://localhost:5000/api/auth/sync', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  firebaseUid: firebaseUser.uid,
                  email: firebaseUser.email,
                  name: firebaseUser.displayName || additionalData.name,
                  avatar: firebaseUser.photoURL
              })
          });
          const data = await response.json();
          return data;
      } catch (error) {
          console.error("Failed to sync user", error);
      }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signup = async (name, email, password) => {
     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
     await updateProfile(userCredential.user, { displayName: name });
     await syncUserWithBackend(userCredential.user, { name });
     return userCredential;
  };

  const logout = () => {
    return signOut(auth);
  };

  const updateUser = async (data) => {
      if (!auth.currentUser) return;
      
      // Update Firebase Profile
      if (data.displayName || data.photoURL) {
          await updateProfile(auth.currentUser, {
              displayName: data.displayName,
              photoURL: data.photoURL
          });
      }

      // Sync with backend
      await syncUserWithBackend(auth.currentUser);
      
      // Force refresh user state
      setUser({ ...auth.currentUser });
  };

  const updateUserPassword = async (newPassword) => {
      if (!auth.currentUser) return;
      const { updatePassword } = await import('firebase/auth');
      await updatePassword(auth.currentUser, newPassword);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, updateUser, updateUserPassword }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
