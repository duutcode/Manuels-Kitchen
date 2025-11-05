import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Search.css";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // NEW: Track if search was made

  const handleSearch = async (e) => {
    e.preventDefault();
    const term = searchTerm.trim();
    if (!term) return;

    setLoading(true);
    setHasSearched(true); // Mark that search was attempted

    try {
      const res = await axios.get(`http://localhost:5001/api/restaurants/search?q=${term}`);
      setResults(res.data);
    } catch (err) {
      console.error("Search failed:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page">
      <div className="search-header">
        <h1>Search Restaurants & Dishes</h1>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Try Waakye, Jollof, Fufu, Manuel..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="loading">
          <p>Searching for "{searchTerm}"...</p>
        </div>
      )}

      {/* RESULTS */}
      {!loading && results.length > 0 && (
        <div className="results">
          <h2>Found {results.length} result{results.length > 1 ? "s" : ""}</h2>
          <div className="results-grid">
            {results.map((r) => (
              <Link key={r._id} to={`/restaurant/${r._id}`} className="result-card">
                <img 
                  src={r.image.startsWith("http") ? r.image : `${process.env.PUBLIC_URL}${r.image}`} 
                  alt={r.name} 
                  onError={(e) => e.target.src = "/images/placeholder.jpg"} // Fallback
                />
                <div className="info">
                  <h3>{r.name}</h3>
                  <p>{r.cuisine} • {r.priceRange}</p>
                  <p className="delivery">{r.deliveryTime}</p>
                  {r.rating && <p className="rating">★ {r.rating}</p>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* NO RESULTS — ONLY AFTER SEARCH */}
      {!loading && hasSearched && results.length === 0 && (
        <div className="no-results">
          <h2>No restaurants found for "{searchTerm}"</h2>
          <p>Try searching for:</p>
          <ul>
            <li>Waakye</li>
            <li>Jollof</li>
            <li>Fufu</li>
            <li>Manuel's Kitchen</li>
          </ul>
        </div>
      )}

      {/* WELCOME — ONLY ON FIRST LOAD */}
      {!loading && !hasSearched && (
        <div className="welcome">
          <h2>Discover Ghanaian Flavors</h2>
          <p>Search for your favorite local dishes and restaurants in Accra</p>
          <div className="suggestions">
            <span onClick={() => setSearchTerm("Waakye")}>Waakye</span>
            <span onClick={() => setSearchTerm("Jollof")}>Jollof</span>
            <span onClick={() => setSearchTerm("Fufu")}>Fufu</span>
            <span onClick={() => setSearchTerm("Banku")}>Banku</span>
          </div>
        </div>
      )}
    </div>
  );
}