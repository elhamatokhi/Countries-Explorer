export default function CountryCard ({country, isFavorite, onToggleFavorite}){
    return (
       <div className="country_card" key={country.cca3}>
            <img src={country.flags?.png} alt={country.name?.common} />
            <h3>{country.name?.common}</h3>
            <p>Population: {country.population?.toLocaleString()}</p>

            <button onClick={() => onToggleFavorite(country.cca3)}>
              {isFavorite ? "★ Favorite" : "☆ Add Favorite"}
            </button>
        </div>
    )
}