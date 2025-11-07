import PokemonCard from "../components/PokemonCard";
import { useEffect, useState } from "react";
import { getPokemonList } from "../api/pokeapi";
import PokedexLayout from "../components/PokedexLayout";
import PokeLoader from "../components/PokeLoader";
import FilterBar from "../components/FilterBar";

export default function Pokedex() {
    const [pokemonList, setPokemonList] = useState([]);
    const [filteredPokemon, setFilteredPokemon] = useState([]);

    // Filters
    const [searchValue, setSearchValue] = useState("");
    const [selectedType, setSelectedType] = useState("");

    const [loading, setLoading] = useState(true);

    // Fetch Pokémon list
    useEffect(() => {
        async function fetchData() {
            const data = await getPokemonList(151); // Gen 1 pour l'instant
            setPokemonList(data);
            setFilteredPokemon(data);
            setLoading(false);
        }
        fetchData();
    }, []);

    // Filter logic
    useEffect(() => {
        let result = pokemonList;

        // Search
        if (searchValue) {
            result = result.filter((pokemon) =>
                pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
            );
        }

        // Type
        if (selectedType) {
            result = result.filter((pokemon) => pokemon.types.includes(selectedType));
        }

        setFilteredPokemon(result);
    }, [searchValue, selectedType, pokemonList]);

    if (loading) return <PokeLoader />;

    return (
        <PokedexLayout>
            <h1 className="text-3xl font-bold mb-4 text-[var(--poke-blue)]">
                Pokédex
            </h1>

            {/* ✅ NEW FILTER BAR */}
            <FilterBar
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
            />

            {/* Pokémon grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filteredPokemon.map((pokemon) => (
                    <PokemonCard
                        key={pokemon.name}
                        name={pokemon.name}
                        sprite={pokemon.sprite}
                        types={pokemon.types}
                    />
                ))}
            </div>
        </PokedexLayout>
    );
}
