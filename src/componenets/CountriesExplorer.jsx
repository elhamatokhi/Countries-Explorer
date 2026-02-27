import { useState } from "react";
import { useEffect } from "react";

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
        </div>
    )
}