import React, { useState, useEffect } from "react";
import "./Checklist.css";
import sidebarBg from "../assets/sidebar-bg.jpg";
import mainBg from "../assets/main-bg.jpg";
import { FaHeart, FaStar, FaCheckSquare } from "react-icons/fa"; // Icons
import gundamData from "../assets/gundams.json"; // Import JSON directly

function Checklist() {
  const [isOpen, setIsOpen] = useState(true);
  const [gundams, setGundams] = useState([]);
  const [filteredGundams, setFilteredGundams] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [checked, setChecked] = useState([]);

  // Load Gundam data from imported JSON
  useEffect(() => {
    setGundams(gundamData);
    setFilteredGundams(gundamData);
  }, []);

  // Handle filtering by category and search
  useEffect(() => {
    let filtered = gundams;

    if (selectedCategory !== "All") {
      if (selectedCategory === "Favorites") filtered = gundams.filter(g => favorites.includes(g.id));
      else if (selectedCategory === "Wishlist") filtered = gundams.filter(g => wishlist.includes(g.id));
      else if (selectedCategory === "Checked") filtered = gundams.filter(g => checked.includes(g.id));
      else filtered = gundams.filter(g => g.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(gundam =>
        gundam.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredGundams(filtered);
  }, [selectedCategory, searchQuery, gundams, favorites, wishlist, checked]);

  // Toggle functions for favorites, wishlist, and checked
  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const toggleChecked = (id) => {
    setChecked(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  return (
    <div className="checklist-container" style={{ backgroundImage: `url(${mainBg})` }}>
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : "closed"}`} style={{ backgroundImage: `url(${sidebarBg})` }}>
        <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "←" : "→"}
        </button>

        {isOpen && (
          <div className="sidebar-content">
            <input
              type="text"
              className="search-bar"
              placeholder="Search Gundam..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {["All", "HG", "RG", "MG", "PG", "Mega", "SD", "MGSD", "Favorites", "Wishlist", "Checked"].map(category => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? "active" : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="content">
        <h1>Gundam Checklist</h1>
        <div className="gundam-grid">
          {filteredGundams.map((gundam) => (
            <div key={gundam.id} className="gundam-card">
              <img src={process.env.PUBLIC_URL + gundam.image} alt={gundam.name} />
              <h3>{gundam.name}</h3>
              <p>Category: {gundam.category}</p>
              <div className="actions">
                <FaHeart
                  className={`favorite-icon ${favorites.includes(gundam.id) ? "active" : ""}`}
                  title="Add to Favorites"
                  onClick={() => toggleFavorite(gundam.id)}
                />
                <FaStar
                  className={`wishlist-icon ${wishlist.includes(gundam.id) ? "active" : ""}`}
                  title="Add to Wishlist"
                  onClick={() => toggleWishlist(gundam.id)}
                />
                <FaCheckSquare
                  className={`check-icon ${checked.includes(gundam.id) ? "active" : ""}`}
                  title="Mark as Owned"
                  onClick={() => toggleChecked(gundam.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Checklist;


