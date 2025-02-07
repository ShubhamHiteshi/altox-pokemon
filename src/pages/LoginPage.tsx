import React, { useState } from "react";
import SignupCard from "../components/SignupCard";
import LoginCard from "../components/LoginCard";

const LoginPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-96 space-y-4">
        {isSignUp ? (
          <SignupCard setIsSignUp={setIsSignUp} />
        ) : (
          <LoginCard setIsSignUp={setIsSignUp} />
        )}
      </div>
    </div>
  );
};

export default LoginPage;
