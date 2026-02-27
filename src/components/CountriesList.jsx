import CountryCard from "./CountryCard";

export default function CountriesList ({ countries, favorites, onToggleFavorite }) {
    if(countries.length === 0) {
        return <p>No results found.</p>
    }

    return(
      <div className="countries_list">
        {countries.map((country) => (
          <CountryCard
           key={country.cca3}
           country={country}
           isFavorite={favorites.includes(country.cca3)}
           onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    )
}