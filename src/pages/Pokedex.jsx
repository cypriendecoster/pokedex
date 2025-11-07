import PokemonCard from "../components/PokemonCard";
import { useEffect, useState } from "react";
import { getPokemonList } from "../api/pokeapi";
import PokedexLayout from "../components/PokedexLayout";
import PokeLoader from "../components/PokeLoader";
import FilterBar from "../components/FilterBar";

export default function Pokedex() {
    const [pokemonList, setPokemonList] = useState([]);
    const [filteredPokemon, setFilteredPokemon] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [searchValue, setSearchValue] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedGen, setSelectedGen] = useState("");

    useEffect(() => {
        async function fetchData() {
            const data = await getPokemonList(1010); // Full Pokédex
            setPokemonList(data);
            setFilteredPokemon(data);
            setLoading(false);
        }
        fetchData();
    }, []);

    useEffect(() => {
        let result = pokemonList;

        // ✅ Filter: Name
        if (searchValue) {
            result = result.filter((p) =>
                p.name.toLowerCase().includes(searchValue.toLowerCase())
            );
        }

        // ✅ Filter: Type
        if (selectedType) {
            result = result.filter((p) => p.types.includes(selectedType));
        }

        // ✅ Filter: Generation
        const genRanges = {
            1: [1, 151], 2: [152, 251], 3: [252, 386], 4: [387, 493],
            5: [494, 649], 6: [650, 721], 7: [722, 809], 8: [810, 898], 9: [899, 1010]
        };

        if (selectedGen) {
            const [min, max] = genRanges[selectedGen];
            result = result.filter((p) => p.id >= min && p.id <= max);
        }

        setFilteredPokemon(result);
    }, [searchValue, selectedType, selectedGen, pokemonList]);

    if (loading) return <PokeLoader />;

    return (
        <PokedexLayout>
            <h1 className="text-3xl font-bold mb-4 text-[var(--poke-blue)]">Pokédex</h1>

            <FilterBar
                searchValue={searchValue} setSearchValue={setSearchValue}
                selectedType={selectedType} setSelectedType={setSelectedType}
                selectedGen={selectedGen} setSelectedGen={setSelectedGen}
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filteredPokemon.map((pokemon) => (
                    <PokemonCard key={pokemon.name} {...pokemon} />
                ))}
            </div>
        </PokedexLayout>
    );
}


