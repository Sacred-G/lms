import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setLoading(false);
        return;
      }
      
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        
        const { data } = await api.get('/auth/me', config);
        
        setUser(data);
        setIsAuthenticated(true);
        setLoading(false);
      } catch (error) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    
    checkAuthStatus();
  }, []);

  // Login user
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data } = await api.post('/auth/login', { email, password });
      
      localStorage.setItem('token', data.token);
      
      // Extract user data without the token
      const userData = {
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role
      };
      
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // Register user
  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data } = await api.post('/auth/register', {
        name,
        email,
        password,
      });
      
      localStorage.setItem('token', data.token);
      
      // Extract user data without the token
      const userData = {
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role
      };
      
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
