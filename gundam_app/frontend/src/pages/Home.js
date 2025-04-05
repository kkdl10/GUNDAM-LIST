import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import backgroundImage from "../assets/gundam.jpg"; 

function Home() {
  return (
    <div 
      className="homepage" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="overlay">
        <h1>Welcome to the Gundam Checklist</h1>
        <Link to="/checklist" className="start-link">
          Start Checklist
        </Link>
      </div>
    </div>
  );
}

export default Home;



