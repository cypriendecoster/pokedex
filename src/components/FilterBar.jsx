import React from "react";

export default function FilterBar({
    searchValue,
    setSearchValue,
    selectedType,
    setSelectedType,
}) {
    const pokemonTypes = [
        "normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison",
        "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"
    ];

    return (
        <div className="bg-white/80 backdrop-blur p-4 rounded-x1 shadow mb-6 border border-gray-200">
            {/* Search Input */}
            <input
                type="text"
                placeholder="Rechercher un Pokémon..."
                className="w-full p-2 mb-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-[var(--poke-blue)]"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />

            {/* Type Filter */}
            <select
                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
            >
                <option value="">Tous les types</option>
                {pokemonTypes.map((t) => (
                    <option key={t} value={t}>
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    );
}