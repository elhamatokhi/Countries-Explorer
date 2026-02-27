import { useState , useEffect} from "react";

const API_ALL = "https://restcountries.com/v3.1/all?fields=name,flags,region,population,cca3"
const API_NAME = "https://restcountries.com/v3.1/name/"
const API_REGION = "https://restcountries.com/v3.1/region/"

function App() {

  // States
   const [countries, setCountries] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState("")
    const [region, setRegion] = useState("all")

// Fetch logic
    const fetchCountries = async () => {
        setLoading(true) // Set loading to true
        setError(null) // Clear previous error

        let url;

        // Decide endpoint based on filters
      // 1️⃣ Search has highest priority
      if (search.trim().length >= 2) {
        url = `${API_NAME}${search.trim()}`;

      // 2️⃣ Region filter
      } else if (region !== "all") {
        url = `${API_REGION}${region}`;

      // 3️⃣ ALL (explicit fallback)
      } else {
        url = API_ALL;
      }

        try {
            const res = await fetch(url)
            if(!res.ok){
              throw new Error("Failed to fetch countries")
            }

            const data = await res.json()
            setCountries(data)
        } catch (error) {
            setError(error.message || "Something went wrong.")
            setCountries([])
        } finally{
            setLoading(false)
        }
    }
/* ------------ Effect ------------ */
    useEffect(()=>{
      fetchCountries()
    }, [search, region])

  

/* ------------ UI ------------ */
  return (
 <div className="main_container">
    <h1>🌍 Countries Explorer</h1>

      {/* Controls */}
      
       <div className="search_input">
            <input 
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search country ..."
            className="input"
            />
       </div>

      <div className="field">

          <label className="label">Select Region</label>
          <select 
              value={region}
              onChange={(e)=>setRegion(e.target.value)}
              className="input">
              <option value={"all"}>All</option>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
          </select>

          {/* Bonus: Clear Filters */}
           <button
           onClick={()=>{
            setSearch("")
            setRegion("all")
           }}
           >Clear Filters</button>

      </div>
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

        {/* No Results */}
        {!loading && !error && countries.length === 0 &&(
          <p>No results found.</p>
        )}
      
       {/* Countries List */}
       <div className="countries_list">
        {countries.map((country) => (
          <div
          className="country_card"
          key={country.cca3}
          >
            <img src={country.flags?.png} alt={country.name?.common} />
            <h3>{country.name?.common}</h3>
            <p>Population: {country.population?.toLocaleString()}</p>
          </div>
        ))}
       </div>

 </div>
  )
}

export default App
