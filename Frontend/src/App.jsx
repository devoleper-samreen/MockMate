import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import InterviewSelectionPage from "./pages/Selection"
import ProtectedRoute from "./protected/ProtectedRoute"
import Room from "./pages/Room"
import Signup from "./components/Signup"
import Login from "./components/Login"
import useSocketStore from "./store/socket.store";
import Profile from "./components/Profile"

const App = () => {
  const { socket, connect } = useSocketStore();

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log(" Socket disconnected! Reconnecting...");
      setTimeout(() => socket.connect(), 3000);
    });

  }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />


        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/select-interview" element={<InterviewSelectionPage />} />
          <Route path="/interview-room/:roomId" element={<Room />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
