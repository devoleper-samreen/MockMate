import React from "react";

const App = () => {
  const handleLogin = () => {

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
