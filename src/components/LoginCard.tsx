import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CgSpinner } from "react-icons/cg";
import axiosInstance from "../services/AxiosInstance";

// Define interface for props
interface LoginCardProps {
  setIsSignUp: (value: boolean) => void;
}

// LoginCard Component
const LoginCard: React.FC<LoginCardProps> = ({ setIsSignUp }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/login", { email, password });

      localStorage.setItem("accessToken", response?.data?.token);

      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data.error || "Something went wrong");
      console.error("Error logging in:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Input */}
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          disabled={isLoading}
        >
          {isLoading ? <CgSpinner className="animate-spin inline-block" /> : "Login"}
        </button>
      </form>

      {/* Switch to Sign Up */}
      <div className="mt-4 text-center">
        <button className="text-blue-600 hover:underline" onClick={() => setIsSignUp(true)}>
          Don't have an account? Sign Up
        </button>
      </div>
    </div>
  );
};

export default LoginCard;
