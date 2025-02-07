import React, { createContext, useEffect, useState, ReactNode } from "react";
import axiosInstance from "../services/AxiosInstance";
import { useNavigate } from "react-router-dom";

// Define User interface
interface User {
  id: number;
  email: string;
  name: string;
  Organization?: {
    name: string;
  };
}

// Define AuthContextType
interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // ✅ Fix added
}

// Create AuthContext
export const AuthContext = createContext<AuthContextType | null>(null);

// Define props for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider Component
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const getCurrentUser = async () => {
    try {
      const response = await axiosInstance.get("/me");
      if (response?.data?.user) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      getCurrentUser();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
