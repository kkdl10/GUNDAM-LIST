import React, { useState, useEffect } from "react";
import "./Checklist.css";
import sidebarBg from "../assets/sidebar-bg.jpg";
import mainBg from "../assets/main-bg.jpg";
import { FaHeart, FaStar, FaCheckSquare } from "react-icons/fa"; // Icons
import gundamData from "../assets/gundams.json"; // Import JSON

function Checklist() {
  const [isOpen, setIsOpen] = useState(true);
  const [gundams, setGundams] = useState([]);
  const [filteredGundams, setFilteredGundams] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [owned, setOwned] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 14; // Display 14 Gundams per page

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
      else if (selectedCategory === "Owned") filtered = gundams.filter(g => owned.includes(g.id));
      else filtered = gundams.filter(g => g.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(gundam =>
        gundam.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredGundams(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [selectedCategory, searchQuery, gundams, favorites, wishlist, owned]);

  // Pagination logic
  const totalPages = Math.ceil(filteredGundams.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentGundams = filteredGundams.slice(startIndex, endIndex);

  // Toggle functions for favorites, wishlist, and owned
  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const toggleOwned = (id) => {
    setOwned(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
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

            {["All", "HG", "RG", "MG", "PG", "Mega", "SD", "MGSD", "Favorites", "Wishlist", "Owned"].map(category => (
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
          {currentGundams.map((gundam) => (
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
                  className={`owned-icon ${owned.includes(gundam.id) ? "active" : ""}`}
                  title="Mark as Owned"
                  onClick={() => toggleOwned(gundam.id)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Buttons */}
        <div className="pagination">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checklist;


