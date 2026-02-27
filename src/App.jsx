import { useState , useEffect} from "react";

const API_ALL = "https://restcountries.com/v3.1/all"
const API_NAME = "https://restcountries.com/v3.1/name/"
const API_REGION = "https://restcountries.com/v3.1/region/"

function App() {

  // States
   const [countries, setCountries] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [region, setRegion] = useState("all")
    const [search, setSearch] = useState(" ")


  return (
    <>
     
    </>
  )
}

export default App
