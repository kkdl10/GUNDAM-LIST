import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import mainBg from "../assets/gundam.jpg";

function Home() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="home-container" style={{ backgroundImage: `url(${mainBg})` }}>
      <div className="overlay"></div> {/* Overlay for styling */}
      
      <h1>Welcome to the Gundam Checklist</h1>

      <form>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
        />

        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>

      <p>Don't have an account? <a href="/signup">Sign up here</a></p>
    </div>
  );
}

export default Home;



