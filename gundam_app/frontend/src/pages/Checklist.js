import React, { useState } from "react";
import "./Checklist.css";
import sidebarBg from "../assets/sidebar-bg.jpg"; // Import sidebar image
import mainBg from "../assets/main-bg.jpg"; // Import main background image

function Checklist() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="checklist-container" style={{ backgroundImage: `url(${mainBg})` }}>
      <div className={`sidebar ${isOpen ? "open" : "closed"}`} style={{ backgroundImage: `url(${sidebarBg})` }}>
        <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "←" : "→"}
        </button>
        {isOpen && (
          <div className="sidebar-content">
            <input type="text" className="search-bar" placeholder="Search Gundam..." />
            <button className="filter-btn">All</button>
            <button className="filter-btn">HG</button>
            <button className="filter-btn">RG</button>
            <button className="filter-btn">MG</button>
            <button className="filter-btn">PG</button>
            <button className="filter-btn">Mega</button>
            <button className="filter-btn">SD</button>
            <button className="filter-btn">MGSD</button>
          </div>
        )}
      </div>
      <div className="content">
        <h1>Gundam Checklist</h1>
        {/* Add more content here */}
      </div>
    </div>
  );
}

export default Checklist;


