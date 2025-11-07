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
        const audio = new Audio("/sounds/radar.mpmp3");
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

    // ✅ Fetch Pokémon + Evolution Tree + Conditions
    useEffect(() => {
        async function fetchPokemon() {
            // 1) Pokémon info
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            setPokemon(res.data);

            // 2) Species data
            const species = await axios.get(res.data.species.url);

            // 3) Evolution chain data
            const evoChain = await axios.get(species.data.evolution_chain.url);

            function extractEvolutionTreeWithConditions(chain) {
                const pretty = (s) => s?.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

                const formatConditions = (detailsArr = []) => {
                    if (!detailsArr.length) return [];
                    const d = detailsArr[0];
                    const parts = [];

                    if (d.trigger?.name === "use-item" && d.item?.name) {
                        parts.push(`Utiliser ${pretty(d.item.name)}`);
                    }
                    if (d.trigger?.name === "level-up") {
                        if (d.min_level) parts.push(`Niveau ${d.min_level}`);
                        if (d.min_happiness) parts.push(`Amitié ≥ ${d.min_happiness}`);
                        if (d.min_beauty) parts.push(`Beauté ≥ ${d.min_beauty}`);
                        if (d.time_of_day)
                            parts.push(d.time_of_day === "day" ? "Jour" : "Nuit");
                        if (d.location?.name) parts.push(`Lieu: ${pretty(d.location.name)}`);
                        if (d.held_item?.name) parts.push(`Tenir: ${pretty(d.held_item.name)}`);
                        if (typeof d.gender === "number")
                            parts.push(d.gender === 1 ? "♀ requis" : "♂ requis");
                        if (typeof d.relative_physical_stats === "number") {
                            const r = d.relative_physical_stats;
                            parts.push(r > 0 ? "Attaque > Défense" : r < 0 ? "Attaque < Défense" : "Attaque = Défense");
                        }
                        if (d.turn_upside_down) parts.push("Console à l'envers");
                    }
                    if (d.trigger?.name === "trade") {
                        parts.push("Échange");
                        if (d.held_item?.name) parts.push(`en tenant ${pretty(d.held_item.name)}`);
                    }
                    return parts;
                };

                const build = (node) => {
                    const urlParts = node.species.url.split("/").filter(Boolean);
                    const id = urlParts[urlParts.length - 1];

                    const children = node.evolves_to.map((e) => {
                        const child = build(e);
                        child.conditions = formatConditions(e.evolution_details);
                        return child;
                    });

                    return { name: node.species.name, id, evolves_to: children };
                };

                return build(chain);
            }

            const tree = extractEvolutionTreeWithConditions(evoChain.data.chain);
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
                            pokemon.sprites?.other?.["official-artwork"]?.front_default ||
                            pokemon.sprites?.front_default
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
                        {evolutionChain ? (
                            <EvolutionTree node={evolutionChain} />
                        ) : (
                            <p className="text-gray-500">Aucune évolution trouvée</p>
                        )}
                    </div>

                </div>
            </div>
        </PokedexLayout>
    );
}




