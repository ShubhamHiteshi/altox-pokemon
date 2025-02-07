import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Props ka type define karna zaroori hai
interface DashboardHeaderProps {
  setShowModel: (value: boolean) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ setShowModel }) => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user ?? null; // ✅ Ensuring user is either User or null

  return (
    <div className="mb-8">
      <div className="w-full h-20 bg-blue-950 flex justify-start lg:justify-center items-center pl-10 lg:pl-0 ">
        <h1 className="text-2xl font-bold text-[white] text-center">
          Dashboard
        </h1>

        <div className="absolute right-10">
          <span className="mr-[10px] text-[white] hidden sm:inline">
            {user?.email}
          </span>

          <button
            onClick={() => {
              setShowModel(true);
            }}
            className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
