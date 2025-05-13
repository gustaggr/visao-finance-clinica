
import { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from "sonner";

export type UserRole = 'doctor' | 'staff' | 'patient';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const mockUsers = [
  {
    id: '1',
    name: 'Dr. Carlos Silva',
    email: 'dr.carlos@visioncare.com',
    password: '123456',
    role: 'doctor' as UserRole,
  },
  {
    id: '2',
    name: 'Ana Secretária',
    email: 'ana@visioncare.com',
    password: '123456',
    role: 'staff' as UserRole,
  },
  {
    id: '3',
    name: 'João Paciente',
    email: 'joao@email.com',
    password: '123456',
    role: 'patient' as UserRole,
  }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Check if user is stored in local storage
    const storedUser = localStorage.getItem('visioncare_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const isAuthenticated = !!user;

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Find user with matching credentials
      const foundUser = mockUsers.find(
        u => u.email === email && u.password === password
      );
      
      if (!foundUser) {
        toast.error('Credenciais inválidas');
        return false;
      }
      
      // Create user object without password
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      
      // Store user in local storage
      localStorage.setItem('visioncare_user', JSON.stringify(userWithoutPassword));
      
      toast.success('Login realizado com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      toast.error('Erro ao fazer login');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('visioncare_user');
    toast.info('Sessão encerrada');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  
  return context;
};
