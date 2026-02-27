export default function Filters({
  search,
  setSearch,
  region,
  setRegion,
  sortByPopulation,
  setSortByPopulation,
  showFavoritesOnly,
  setShowFavoritesOnly,
  onClear,
}) {
  return (
    <>
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
          onChange={(e) => setRegion(e.target.value)}
          className="input"
        >
          <option value={"all"}>All</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>

        {/* Bonus: Filter by favorites*/}

        <button onClick={() => setShowFavoritesOnly((prev) => !prev)}>
          {showFavoritesOnly ? "Show All" : "Show Favorites"}
        </button>

        {/* Bonus: Sort by population */}
        <button onClick={() => setSortByPopulation((prev) => !prev)}>
          Sort by Population {sortByPopulation ? "✓" : ""}
        </button>

        {/* Bonus: Clear Filters */}
         <button onClick={onClear}>Clear Filters</button>
      </div>
    </>
  );
}
