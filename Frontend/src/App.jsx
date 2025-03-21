import React from "react";
import { authenticate } from "./apiManager/auth"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import InterviewSelectionPage from "./pages/Selection"

const App = () => {
  const handleLogin = () => {
    const response = authenticate()
    console.log('response : ', response);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select-interview" element={<InterviewSelectionPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
