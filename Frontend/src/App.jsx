import React from "react";
import { authenticate } from "./apiManager/auth"

const App = () => {
  const handleLogin = async () => {
    const response = await authenticate()
    console.log('response : ', response);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={handleLogin}
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition cursor-pointer"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default App;
