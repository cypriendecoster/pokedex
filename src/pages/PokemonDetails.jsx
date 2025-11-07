import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TypeBadge from "../components/TypeBadge";

export default function PokemonDetails() {
    const { name } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        async function fetchPokemon() {
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            setPokemon(res.data);
        }
        fetchPokemon();
    }, [name]);

    if (!pokemon) return <p className="text-center py-8">Chargement...</p>;

    return (
        <div className="max-w-md mx-auto text-center">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
            >
                ← Retour
            </button>

            <h1 className="text-3xl font-bold capitalize mb-2">{pokemon.name}</h1>

            <img
                src={
                    pokemon.sprites.other["official-artwork"].front_default ||
                    pokemon.sprites.front_default
                }
                alt={pokemon.name}
                className="w-40 h-40 mx-auto mb-4"
            />

            <div className="flex justify-center gap-2 mb-4">
                {pokemon.types.map((t) => (
                    <TypeBadge key={t.type.name} type={t.type.name} />
                ))}
            </div>

            <h2 className="text-xl font-semibold mb-2">Stats</h2>

            <div className="space-y-2 text-left">
                {pokemon.stats.map((stat) => (
                    <div key={stat.stat.name}>
                        <span className="capitalize font-medium">{stat.stat.name}: </span>
                        <span>{stat.base_stat}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
