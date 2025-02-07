import React from "react";
import { useNavigate } from "react-router-dom";

// Define interface for props
interface LogoutModelProps {
  setShowModel: (value: boolean) => void;
}

// LogoutModel Component
const LogoutModel: React.FC<LogoutModelProps> = ({ setShowModel }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold">Confirm Logout</h2>
        <p className="text-gray-600 mt-2">Are you sure you want to log out?</p>

        <div className="flex justify-end mt-4 space-x-3">
          <button
            onClick={() => setShowModel(false)}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("accessToken");
              navigate("/");
              setShowModel(false);
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModel;
