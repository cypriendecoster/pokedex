import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TypeBadge from "../components/TypeBadge";
import StatBar from "../components/StatBar";
import PokedexLayout from "../components/PokedexLayout";
import PokeLoader from "../components/PokeLoader";
import EvolutionTree from "../components/EvolutionTree";

export default function PokemonDetails() {
    const { name } = useParams();
    const navigate = useNavigate();

    const [pokemon, setPokemon] = useState(null);
    const [evolutionChain, setEvolutionChain] = useState(null);

    // ✅ Radar sound
    useEffect(() => {
        const audio = new Audio("/sounds/radar.mp3");
        audio.volume = 0.5;

        const tryPlay = () => {
            audio.play()
                .then(() => {
                    window.removeEventListener("click", tryPlay);
                    window.removeEventListener("keydown", tryPlay);
                    window.removeEventListener("touchstart", tryPlay);
                })
                .catch(() => { });
        };

        audio.play().catch(() => {
            window.addEventListener("click", tryPlay);
            window.addEventListener("keydown", tryPlay);
            window.addEventListener("touchstart", tryPlay);
        });
    }, []);

    // ✅ Fetch Pokémon + evolution tree
    useEffect(() => {
        async function fetchPokemon() {
            // 1) Base Pokémon data
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            setPokemon(res.data);

            // 2) Species
            const species = await axios.get(res.data.species.url);

            // 3) Evolution Chain
            const evoChain = await axios.get(species.data.evolution_chain.url);

            // ✅ Build a tree structure of evolutions
            function extractEvolutionTree(chain) {
                const build = (node) => {
                    const urlParts = node.species.url.split("/").filter(Boolean);
                    const id = urlParts[urlParts.length - 1]; // extract ID
                    return {
                        name: node.species.name,
                        id,
                        evolves_to: node.evolves_to.map(build) // recursion
                    };
                };

                return build(chain);
            }

            const tree = extractEvolutionTree(evoChain.data.chain);
            setEvolutionChain(tree);
        }

        fetchPokemon();
    }, [name]);

    if (!pokemon) return <PokeLoader />;

    return (
        <PokedexLayout>
            <div className="relative overflow-hidden">
                <div className="scan-line"></div>

                <div className="z-10 relative">
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

                    <div className="space-y-2 text-left mb-6">
                        {pokemon.stats.map((stat) => (
                            <StatBar
                                key={stat.stat.name}
                                label={stat.stat.name}
                                value={stat.base_stat}
                            />
                        ))}
                    </div>

                    {/* ✅ Evolution Tree */}
                    <h2 className="text-xl font-semibold mt-6 mb-3 text-center">Évolutions</h2>

                    <div className="flex justify-center">
                        <EvolutionTree node={evolutionChain} />
                    </div>
                </div>
            </div>
        </PokedexLayout>
    );
}



