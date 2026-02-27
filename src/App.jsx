import { useState, useEffect } from "react";
import "./App.css";
import Filters from './components/Filters'
import CountriesList from './components/CountriesList'

const FIELDS = "name,flags,region,population,cca3";

const API_ALL = `https://restcountries.com/v3.1/all?fields=${FIELDS}`;
const API_NAME = "https://restcountries.com/v3.1/name/";
const API_REGION = "https://restcountries.com/v3.1/region/";

function App() {
  // States
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");

  // Bonus Features
  const [debouncedSearch, setDebouncedSearch] = useState(""); // prevents API spam
  const [sortByPopulation, setSortByPopulation] = useState(false); // toggle sorting
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Fetch logic
  const fetchCountries = async () => {
    setLoading(true); // Set loading to true
    setError(null); // Clear previous error

    let url;

    // Decide endpoint based on filters
    // 1️⃣ Search has highest priority
    if (search.trim().length >= 2) {
      url = `${API_NAME}${debouncedSearch.trim()}?fields=${FIELDS}`;

      // 2️⃣ Region filter
    } else if (region !== "all") {
      url = `${API_REGION}${region}?fields=${FIELDS}`;

      // 3️⃣ ALL (explicit fallback)
    } else {
      url = API_ALL;
    }

    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch countries");
      }

      let data = await res.json();
      // Sort by population
      if (sortByPopulation) {
        data = [...data].sort(
          (a, b) => (b.population || 0) - (a.population || 0),
        );
      }

      setCountries(data);
    } catch (error) {
      setError(error.message || "Something went wrong.");
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };
  /* ------------ Effect ------------ */
  useEffect(() => {
    fetchCountries();
  }, [debouncedSearch, region, sortByPopulation]);

  /* -------- Favorites -------- */
  const toggleFavorite = (cca3) => {
    const updated = favorites.includes(cca3)
      ? favorites.filter((id) => id !== cca3)
      : [...favorites, cca3];

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

const visibleCountries = showFavoritesOnly
  ? countries.filter((c) => favorites.includes(c.cca3))
  : countries;

 const clearFilters = () => {
    setSearch("");
    setRegion("all");
    setSortByPopulation(false);
    setShowFavoritesOnly(false);
  };

  /* ------------ UI ------------ */
  return (
    <div className="main_container">
      <h1>🌍 Countries Explorer</h1>

      {/* Controls */}
     <Filters
        search={search}
        setSearch={setSearch}
        region={region}
        setRegion={setRegion}
        sortByPopulation={sortByPopulation}
        setSortByPopulation={setSortByPopulation}
        showFavoritesOnly={showFavoritesOnly}
        setShowFavoritesOnly={setShowFavoritesOnly}
        onClear={clearFilters}
      />

      {/*--------------- Loading State ------------------*/}

      {/* Error handling - Show a paragaph if loading */}
      {loading && <p>Loading countries...</p>}

      {/* Error State */}
      {error && (
        <div>
          <p>Error: {error}</p>
          <button onClick={fetchCountries}>Retry</button>
        </div>
      )}

      {!loading && !error && (
        <CountriesList
          countries={visibleCountries}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      )}

     
    </div>
  );
}

export default App;
