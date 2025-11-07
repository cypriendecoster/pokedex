export default function SearchBar({ searchValue, setSearchValue }) {
    return (
        <div className="mb-6">
            <input
                type="text"
                placeholder="Recherche un Pokémon..."
                className="w-full p-2 rounded-lg border border-gray-300 focus:outline:none focus:ring-2 focus:ring-[var(--poke-blue)]"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
        </div>
    );
}