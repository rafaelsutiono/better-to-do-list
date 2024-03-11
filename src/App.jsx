import "./App.css";
import Todo from "./pages/Todo";
import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/profile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/homepage" element={<Landing />} exact />
        <Route path="/todo" element={<Todo />} />
        <Route path="/" element={<SignUp />} exact/>
        <Route path="/login" element={<Login />} exact/>
        <Route path="/profile" element={<Profile />} exact/>
      </Routes> 
    </Router>

    // <Todo />
  );
}

export default App;
