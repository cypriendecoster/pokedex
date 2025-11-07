export default function FilterBar({
    searchValue, setSearchValue,
    selectedType, setSelectedType,
    selectedGen, setSelectedGen,
    minHP, setMinHP,
    minAttack, setMinAttack,
    minDefense, setMinDefense,
    minSpAttack, setMinSpAttack,
    minSpDefense, setMinSpDefense,
    minSpeed, setMinSpeed,
    minTotalStats, setMinTotalStats
}) {

    const pokemonTypes = [
        "normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison",
        "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"
    ];

    const typeColors = {
        normal: "bg-gray-400", fire: "bg-orange-500", water: "bg-blue-500",
        electric: "bg-yellow-400 text-black", grass: "bg-green-500",
        ice: "bg-cyan-400 text-black", fighting: "bg-red-700",
        poison: "bg-purple-600", ground: "bg-yellow-700", flying: "bg-indigo-400",
        psychic: "bg-pink-500", bug: "bg-lime-600", rock: "bg-yellow-800",
        ghost: "bg-violet-700", dragon: "bg-indigo-800", dark: "bg-gray-800",
        steel: "bg-gray-500", fairy: "bg-pink-400"
    };

    return (
        <div className="bg-white/80 backdrop-blur p-4 rounded-xl shadow mb-6 border border-gray-200">

            {/* Search */}
            <input
                type="text"
                placeholder="Rechercher un Pokémon..."
                className="w-full p-2 mb-3 rounded-lg border border-gray-300"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />

            {/* Types */}
            <div className="flex flex-wrap gap-2 justify-center mb-3">
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
                        className={`px-3 py-1 rounded-full text-xs capitalize
              ${typeColors[type]}
              ${selectedType === type ? "ring-2 ring-black scale-105" : "opacity-80 hover:opacity-100"}
            `}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {/* Generations */}
            <div className="flex flex-wrap gap-2 justify-center mb-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((gen) => (
                    <button
                        key={gen}
                        onClick={() => setSelectedGen(selectedGen === gen ? "" : gen)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold
              ${selectedGen === gen ? "bg-[var(--poke-blue)] text-white scale-105" : "bg-gray-200"}
            `}
                    >
                        Gen {gen}
                    </button>
                ))}
            </div>

            {/* Stat sliders */}
            <div className="space-y-3 text-sm mt-3">

                <div>
                    <label>PV ≥ {minHP}</label>
                    <input type="range" min="0" max="255" value={minHP} onChange={(e) => setMinHP(Number(e.target.value))} className="w-full" />
                </div>

                <div>
                    <label>Attaque ≥ {minAttack}</label>
                    <input type="range" min="0" max="200" value={minAttack} onChange={(e) => setMinAttack(Number(e.target.value))} className="w-full" />
                </div>

                <div>
                    <label>Défense ≥ {minDefense}</label>
                    <input type="range" min="0" max="230" value={minDefense} onChange={(e) => setMinDefense(Number(e.target.value))} className="w-full" />
                </div>

                <div>
                    <label>Attaque Spéciale ≥ {minSpAttack}</label>
                    <input type="range" min="0" max="200" value={minSpAttack} onChange={(e) => setMinSpAttack(Number(e.target.value))} className="w-full" />
                </div>

                <div>
                    <label>Défense Spéciale ≥ {minSpDefense}</label>
                    <input type="range" min="0" max="230" value={minSpDefense} onChange={(e) => setMinSpDefense(Number(e.target.value))} className="w-full" />
                </div>

                <div>
                    <label>Vitesse ≥ {minSpeed}</label>
                    <input type="range" min="0" max="200" value={minSpeed} onChange={(e) => setMinSpeed(Number(e.target.value))} className="w-full" />
                </div>

                <div>
                    <label>Total Stats ≥ {minTotalStats}</label>
                    <input type="range" min="0" max="700" value={minTotalStats} onChange={(e) => setMinTotalStats(Number(e.target.value))} className="w-full" />
                </div>
            </div>

        </div>
    );
}



