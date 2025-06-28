
import { useState, createContext, useContext, useEffect } from 'react';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (name: string, email: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté au chargement
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (name: string, email: string) => {
    // Vérifier les identifiants fixes
    if (name === 'admin' && email === 'admin@email.com') {
      const userData = { name, email };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
