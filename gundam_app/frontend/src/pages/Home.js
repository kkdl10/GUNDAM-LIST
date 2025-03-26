import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import mainBg from "../assets/gundam.jpg"; // Import the background image

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container" style={{ backgroundImage: `url(${mainBg})` }}>
      <div className="overlay"></div> {/* Overlay for better contrast */}
      <h1>Welcome to the Gundam Checklist</h1>
      <button className="start-button" onClick={() => navigate("/checklist")}>
        Start Checking 
      </button>
    </div>
  );
}

export default Home;


