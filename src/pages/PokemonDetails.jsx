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

  // ✨ Shiny toggle (persisté)
  const [shiny, setShiny] = useState(() => {
    const saved = localStorage.getItem("dex_shiny");
    return saved ? JSON.parse(saved) : false;
  });
  useEffect(() => {
    localStorage.setItem("dex_shiny", JSON.stringify(shiny));
  }, [shiny]);

  // Fetch Pokémon + Evolution tree + conditions
  useEffect(() => {
    async function fetchPokemon() {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      setPokemon(res.data);

      const species = await axios.get(res.data.species.url);
      const evoChain = await axios.get(species.data.evolution_chain.url);

      function extractEvolutionTreeWithConditions(chain) {
        const pretty = (s) => s?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

        const formatConditions = (detailsArr = []) => {
          if (!detailsArr.length) return [];
          const d = detailsArr[0];
          const parts = [];

          if (d.trigger?.name === "use-item" && d.item?.name) {
            parts.push({ icon: "⚡", text: `Pierre ${pretty(d.item.name)}` });
          }

          if (d.trigger?.name === "level-up") {
            if (d.min_level) parts.push({ icon: "⬆️", text: `Niveau ${d.min_level}` });
            if (d.min_happiness) parts.push({ icon: "💖", text: `Amitié ≥ ${d.min_happiness}` });
            if (d.time_of_day === "day") parts.push({ icon: "🌞", text: "Jour" });
            if (d.time_of_day === "night") parts.push({ icon: "🌙", text: "Nuit" });
            if (d.location?.name) parts.push({ icon: "📍", text: `Lieu: ${pretty(d.location.name)}` });
            if (d.held_item?.name) parts.push({ icon: "🎒", text: `Tenir ${pretty(d.held_item.name)}` });
            if (d.known_move?.name) parts.push({ icon: "🎯", text: `Move ${pretty(d.known_move.name)}` });

            if (typeof d.relative_physical_stats === "number") {
              const r = d.relative_physical_stats;
              parts.push({
                icon: "🥊",
                text: r > 0 ? "Attaque > Défense" : r < 0 ? "Attaque < Défense" : "Attaque = Défense",
              });
            }
          }

          if (d.trigger?.name === "trade") {
            parts.push({ icon: "🔄", text: "Échange" });
            if (d.held_item?.name) parts.push({ icon: "🎒", text: `tenu ${pretty(d.held_item.name)}` });
          }

          return parts.length ? parts : [{ icon: "❓", text: pretty(d.trigger?.name) }];
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

      setEvolutionChain(extractEvolutionTreeWithConditions(evoChain.data.chain));
    }

    fetchPokemon();
  }, [name]);

  if (!pokemon) return <PokeLoader />;

  const mainImg =
    shiny
      ? (pokemon.sprites?.other?.["official-artwork"]?.front_shiny || pokemon.sprites?.front_shiny)
      : (pokemon.sprites?.other?.["official-artwork"]?.front_default || pokemon.sprites?.front_default);

  return (
    <PokedexLayout>
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => navigate(-1)} className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">
          ← Retour
        </button>

        {/* ✨ Shiny toggle button */}
        <button
          onClick={() => setShiny((s) => !s)}
          className={`px-3 py-1 rounded-full border text-sm transition 
            ${shiny ? "bg-yellow-100 border-yellow-400 shiny-glow" : "bg-white border-gray-300"}`}
          title="Afficher les versions Shiny"
        >
          {shiny ? "⭐ Shiny ON" : "☆ Shiny OFF"}
        </button>
      </div>

      <h1 className="text-3xl font-bold capitalize mb-2 text-center">{pokemon.name}</h1>

      <img
        src={mainImg}
        alt={pokemon.name}
        className={`w-40 h-40 mx-auto mb-4 ${shiny ? "shiny-glow" : ""}`}
      />

      <div className="flex justify-center gap-2 mb-4">
        {pokemon.types.map((t) => (
          <TypeBadge key={t.type.name} type={t.type.name} />
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-2 text-center">Stats</h2>
      <div className="space-y-2 text-left mb-6">
        {pokemon.stats.map((s) => (
          <StatBar key={s.stat.name} label={s.stat.name} value={s.base_stat} />
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-3 text-center">Évolutions</h2>
      <div className="flex justify-center">
        {evolutionChain ? (
          <EvolutionTree node={evolutionChain} shiny={shiny} />
        ) : (
          <p className="text-gray-500">Aucune évolution trouvée</p>
        )}
      </div>
    </PokedexLayout>
  );
}






