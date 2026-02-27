import { useState , useEffect} from "react";

const API_ALL = "https://restcountries.com/v3.1/all"
const API_NAME = "https://restcountries.com/v3.1/name/"
const API_REGION = "https://restcountries.com/v3.1/region/"

export default function CountriesExplorer(){
    const [countries, setCountries] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [region, setRegion] = useState("all")
    const [search, setSearch] = useState(" ")

// Fetch data
    useEffect(()=>{
        setLoading(true) // Set loading to true
        setError(null) // Clear previous error
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
        <div>
            <div className="search_input">
                <input type="text"
                label={"Search"}
                value={search}
                onChange={setSearch}
                placeholder="Enter country name"
                className="input"
                />
            </div>

            <div className="field">
            <label className="label">Select Region</label>
            <select 
                value={value}
                onChange={(e)=>onChange(e.target.value)}
                className="input">
                {options.map((opt)=><option key={opt} value={opt}>{opt}</option>)} 
            </select>
            </div>
        </div>
    )
}