import React, { useState } from "react";
import "./Checklist.css";

function Checklist() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Sample Gundam list (Replace with real data later)
  const gundams = [
    { name: "RX-78-2", category: "HG" },
    { name: "Strike Gundam", category: "RG" },
    { name: "Wing Gundam", category: "MG" },
    { name: "Exia", category: "PG" },
    { name: "Barbatos", category: "Mega" },
    { name: "Zaku II", category: "SD" },
    { name: "Unicorn Gundam", category: "MGSD" },
    { name: "Freedom Gundam", category: "HG" },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Filter Gundams based on search input and selected category
  const filteredGundams = gundams.filter(
    (gundam) =>
      (selectedCategory ? gundam.category === selectedCategory : true) &&
      gundam.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      {/* Sidebar for category filters */}
      <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isSidebarOpen ? "❮" : "❯"}
        </button>

        {isSidebarOpen && (
          <div className="filter-buttons">
            <button onClick={() => setSelectedCategory(null)}>All</button>
            <button onClick={() => setSelectedCategory("HG")}>HG</button>
            <button onClick={() => setSelectedCategory("RG")}>RG</button>
            <button onClick={() => setSelectedCategory("MG")}>MG</button>
            <button onClick={() => setSelectedCategory("PG")}>PG</button>
            <button onClick={() => setSelectedCategory("Mega")}>Mega</button>
            <button onClick={() => setSelectedCategory("SD")}>SD</button>
            <button onClick={() => setSelectedCategory("MGSD")}>MGSD</button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>Gundam Checklist</h1>
        <input
          type="text"
          placeholder="Search for a Gundam..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Gundam List */}
        <ul className="gundam-list">
          {filteredGundams.length > 0 ? (
            filteredGundams.map((gundam, index) => (
              <li key={index}>
                {gundam.name} <span className="category">({gundam.category})</span>
              </li>
            ))
          ) : (
            <li className="no-results">No results found</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Checklist;


