import PokemonCard from "../components/PokemonCard";
import { useEffect, useState } from "react";
import { getPokemonList } from "../api/pokeapi";
import SearchBar from "../components/SearchBar";
import PokedexLayout from "../components/PokedexLayout";
import PokeLoader from "../components/PokeLoader";

export default function Pokedex() {

    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        async function fetchData() {
            const data = await getPokemonList();
            setPokemonList(data);
            setLoading(false);
        }
        fetchData();
    }, []);

    if (loading) {
        return <PokeLoader />;
    }

    const filteredPokemon = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <PokedexLayout>
            <h1 className="text-3xl font-bold mb-4 text-[var(--poke-blue)]">
                Pokédex
            </h1>

            <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />

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