import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CgSpinner } from "react-icons/cg";
import axiosInstance from "../services/AxiosInstance";

// Define interface for props
interface SignupCardProps {
  setIsSignUp: (value: boolean) => void;
}

// Define interface for organization data
interface Organization {
  id: number;
  name: string;
}

// SignupCard Component
const SignupCard: React.FC<SignupCardProps> = ({ setIsSignUp }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [organizationId, setOrganizationId] = useState<number | undefined>(undefined);
  const [organizationList, setOrganizationList] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axiosInstance.post("/register-user", {
        email,
        password,
        organizationId,
      });

      toast.success("User registered successfully!");
      setIsSignUp(false);
    } catch (error: any) {
      toast.error(error.response?.data.error || "Something went wrong");
      console.error("Error registering user:", error.response);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch organization list
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await axiosInstance.get("/organizations");
        setOrganizationList(response.data.organizations);
      } catch (error) {
        toast.error("Failed to load organizations.");
      }
    };

    fetchOrganizations();
  }, []);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

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

        {/* Organization Dropdown */}
        <div>
          <label className="block text-gray-700">Organization</label>
          <select
            className="w-full p-2 border rounded"
            value={organizationId}
            onChange={(e) => setOrganizationId(Number(e.target.value))}
            required
          >
            <option value="">Select an organization</option>
            {organizationList.map((org) => (
              <option key={org.id} value={org.id}>
                {org.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          disabled={isLoading}
        >
          {isLoading ? <CgSpinner className="animate-spin inline-block" /> : "Register"}
        </button>
      </form>

      {/* Switch to Login */}
      <div className="mt-4 text-center">
        <button className="text-blue-600 hover:underline" onClick={() => setIsSignUp(false)}>
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

export default SignupCard;
