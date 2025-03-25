import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import InterviewSelectionPage from "./pages/Selection"
import ProtectedRoute from "./protected/ProtectedRoute"
import Room from "./pages/Room"
import Signup from "./components/Signup"
import Login from "./components/Login"

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />


        <Route element={<ProtectedRoute />}>
          <Route path="/select-interview" element={<InterviewSelectionPage />} />
          <Route path="/interview-room/:roomId" element={<Room />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
