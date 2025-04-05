import React, { useState, useEffect } from "react";
import "./Checklist.css";
import sidebarBg from "../assets/sidebar-bg.jpg";
import mainBg from "../assets/main-bg.jpg";
import { FaHeart, FaStar, FaCheckSquare } from "react-icons/fa";
import gundamsData from "../assets/gundams.json"; 

function Checklist() {
  const [isOpen, setIsOpen] = useState(true);
  const [gundams, setGundams] = useState([]);
  const [filteredGundams, setFilteredGundams] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || []);
  const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem("wishlist")) || []);
  const [owned, setOwned] = useState(JSON.parse(localStorage.getItem("owned")) || []);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 14;

  useEffect(() => {
    setGundams(gundamsData); 
    setFilteredGundams(gundamsData);
  }, []);

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
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, gundams, favorites, wishlist, owned]);

  const totalPages = Math.ceil(filteredGundams.length / itemsPerPage);
  const currentGundams = filteredGundams.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const toggleItem = (list, setList, key, id) => {
    const updatedList = list.includes(id) ? list.filter(item => item !== id) : [...list, id];
    setList(updatedList);
    localStorage.setItem(key, JSON.stringify(updatedList));
  };

  return (
    <div className="checklist-container" style={{ backgroundImage: `url(${mainBg})` }}>
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
      <div className="content">
        <h1>Gundam Checklist</h1>
        <div className="gundam-grid">
          {currentGundams.map(gundam => (
            <div key={gundam.id} className="gundam-card">
              <img src={gundam.image} alt={gundam.name} />
              <h3>{gundam.name}</h3>
              <p>Category: {gundam.category}</p>
              <div className="actions">
                <FaHeart
                  className={`favorite-icon ${favorites.includes(gundam.id) ? "active" : ""}`}
                  onClick={() => toggleItem(favorites, setFavorites, "favorites", gundam.id)}
                />
                <FaStar
                  className={`wishlist-icon ${wishlist.includes(gundam.id) ? "active" : ""}`}
                  onClick={() => toggleItem(wishlist, setWishlist, "wishlist", gundam.id)}
                />
                <FaCheckSquare
                  className={`owned-icon ${owned.includes(gundam.id) ? "active" : ""}`}
                  onClick={() => toggleItem(owned, setOwned, "owned", gundam.id)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="pagination">
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
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
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checklist;


