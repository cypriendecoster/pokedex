export default function FilterBar({
    searchValue, setSearchValue,
    selectedType, setSelectedType,
    selectedGen, setSelectedGen
}) {

    const pokemonTypes = [
        "normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison",
        "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"
    ];

    const typeColors = {
        normal: "bg-gray-400",
        fire: "bg-orange-500",
        water: "bg-blue-500",
        electric: "bg-yellow-400 text-black",
        grass: "bg-green-500",
        ice: "bg-cyan-400 text-black",
        fighting: "bg-red-700",
        poison: "bg-purple-600",
        ground: "bg-yellow-700",
        flying: "bg-indigo-400",
        psychic: "bg-pink-500",
        bug: "bg-lime-600",
        rock: "bg-yellow-800",
        ghost: "bg-violet-700",
        dragon: "bg-indigo-800",
        dark: "bg-gray-800",
        steel: "bg-gray-500",
        fairy: "bg-pink-400"
    };

    return (
        <div className="bg-white/80 backdrop-blur p-4 rounded-xl shadow mb-6 border border-gray-200">

            {/* Search */}
            <input
                type="text"
                placeholder="Rechercher un Pokémon..."
                className="w-full p-2 mb-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--poke-blue)]"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />

            {/* Type chips */}
            <div className="flex flex-wrap gap-2 justify-center">
                <button
                    onClick={() => setSelectedType("")}
                    className={`px-3 py-1 rounded-full text-xs ${selectedType === "" ? "bg-black text-white" : "bg-gray-200"}`}
                >
                    Tous
                </button>

                {pokemonTypes.map((type) => (
                    <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`
              px-3 py-1 rounded-full text-xs capitalize transition
              ${typeColors[type]}
              ${selectedType === type ? "ring-2 ring-black scale-105" : "opacity-80 hover:opacity-100"}
            `}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {/* Generation buttons */}
            <div className="flex flex-wrap gap-2 justify-center mt-3">
                {[
                    { gen: 1, range: [1, 151] },
                    { gen: 2, range: [152, 251] },
                    { gen: 3, range: [252, 386] },
                    { gen: 4, range: [387, 493] },
                    { gen: 5, range: [494, 649] },
                    { gen: 6, range: [650, 721] },
                    { gen: 7, range: [722, 809] },
                    { gen: 8, range: [810, 898] },
                    { gen: 9, range: [899, 1010] },
                ].map(({ gen }) => (
                    <button
                        key={gen}
                        onClick={() => setSelectedGen(selectedGen === gen ? "" : gen)}
                        className={`px-3 py-1 rounded-full text-xs font-medium 
              ${selectedGen === gen ? "bg-[var(--poke-blue)] text-white scale-105" : "bg-gray-200"}
              transition`}
                    >
                        Gen {gen}
                    </button>
                ))}
            </div>
        </div>
    );
}

