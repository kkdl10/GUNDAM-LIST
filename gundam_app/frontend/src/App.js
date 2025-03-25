import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Checklist from "./pages/Checklist";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checklist" element={<Checklist />} />
      </Routes>
    </Router>
  );
}

export default App;
