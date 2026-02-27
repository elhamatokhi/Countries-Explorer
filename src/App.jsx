import { useState , useEffect} from "react";

const API_ALL = "https://restcountries.com/v3.1/all"
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

        let url = API_ALL

        // Decide endpoint based on filters
        if(search.length >= 2){
          url=`${API_NAME}${search}`
        } else if (region !== "all") {
          url = `${API_REGION}${region}`;
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
            label={"Search"}
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
              <option value="Australia">Australia</option>
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

        {/* If error occurs and not loading => display error */}
        {!loading && error && (
        <div className="errorBox">
            <p className="errorTitle">Error</p>
            <p className="errorText">{error}</p>
            <p className="hint">Tip: disconnect from internet and change the URL...</p>
        </div>
        )}
      
       {/* Countries List */}
       <div className="countries_list">
        {countries.map((country) => (
          <div className="key"
          key={country.cca3}
          >
            <img src={country.flags?.png} alt={country.name?.common} />
            <h3>{country.name?.common}</h3>
            <p>Population: {country.population?.toLocalString()}</p>
          </div>
        ))}
       </div>

 </div>
  )
}

export default App
