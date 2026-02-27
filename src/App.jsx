import { useState , useEffect} from "react";

const API_ALL = "https://restcountries.com/v3.1/all"
const API_NAME = "https://restcountries.com/v3.1/name/"
const API_REGION = "https://restcountries.com/v3.1/region/"

function App() {

  // States
   const [countries, setCountries] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState(" ")
    const [region, setRegion] = useState("all")

// Fetch logic
    useEffect(()=>{
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
            
        } catch (error) {
            setError(error.message || "Something went wrong.")
        } finally{
            setLoading(false)
        }
    },[search, region])

    {/* Error handling - Show a paragaph if loading */}
        {loading && <p>Loading countries...</p>}
        {/* If error occurs and not loading => display error */}
        {!loading && error && (
        <div className="errorBox">
            <p className="errorTitle">Error</p>
            <p className="errorText">{error}</p>
            <p className="hint">Tip: disconnect from internet and change the URL...</p>
        </div>
        )}
  return (
    <>
     
    </>
  )
}

export default App
