import PokemonCard from "../components/PokemonCard";
import { useEffect, useState } from "react";
import { getPokemonList } from "../api/pokeapi";

export default function Pokedex() {

    const [pokemonList, setPokemonList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getPokemonList();
            setPokemonList(data);
        }
        fetchData();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4 text-[var(--poke-blue)]">
                Pokédex
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {pokemonList.map((pokemon) => (
                    <PokemonCard key={pokemon.name} name={pokemon.name} />
                ))}
            </div>
        </div>
    );
}