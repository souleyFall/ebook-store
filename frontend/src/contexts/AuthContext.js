// AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/auth.php?action=check');
        const data = await response.json();
        
        if (data.authenticated) {
          setUser(data.user);
          setIsAdmin(data.user.role === 'admin');
          setIsConnected(true);
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l authentification:', error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:8000/api/auth.php?action=login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setUser(data.user);
        setIsAdmin(data.user.role === 'admin');
        setIsConnected(true);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      return { success: false, message: 'Erreur de connexion au serveur' };
    }
  };

  const logout = async () => {
    try {
      await fetch('http://localhost:8000/api/auth.php?action=logout');
      setUser(null);
      setIsAdmin(false);
      setIsConnected(false);
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isConnected, isAdmin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

