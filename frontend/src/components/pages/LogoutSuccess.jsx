import React from "react";

const LogoutSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-2xl font-semibold mb-4">You have been logged out successfully!</h1>
      <a href="/login" className="text-blue-600 hover:underline">
        Go back to Login
      </a>
    </div>
  );
};

export default LogoutSuccess;
