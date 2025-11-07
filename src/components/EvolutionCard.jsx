import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

/**
 * EvolutionCard
 * - affiche un Pokémon d'évolution
 * - shiny support (artwork shiny si activé)
 * - animation morph + sparkles + délai de navigation
 */
export default function EvolutionCard({ name, id, shiny = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [animating, setAnimating] = useState(false);

  // Reset anim à chaque changement d’URL
  useEffect(() => {
    setAnimating(false);
  }, [location.pathname]);

  const handleClick = (e) => {
    e.preventDefault();
    if (animating) return;
    setAnimating(true);
    setTimeout(() => navigate(`/pokemon/${name}`), 420);
  };

  // URL artworks (official-artwork prend aussi les shiny via /shiny/{id}.png)
  const imgUrl = shiny
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png`
    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <button
      onClick={handleClick}
      className="relative block text-center group focus:outline-none"
      aria-label={`Voir ${name}`}
    >
      <img
        src={imgUrl}
        alt={name}
        className={`w-20 h-20 mx-auto transition-transform duration-400 ease-out ${animating ? "evo-morph" : "group-hover:scale-110"} ${shiny ? "shiny-glow" : ""}`}
      />

      <p className="capitalize text-sm mt-1">{name}</p>

      {/* Sparkles */}
      <div className={`sparkle-wrap pointer-events-none ${animating ? "spark-on" : ""}`}>
        <span className="sparkle sp1"></span>
        <span className="sparkle sp2"></span>
        <span className="sparkle sp3"></span>
        <span className="sparkle sp4"></span>
        <span className="sparkle sp5"></span>
        <span className="sparkle sp6"></span>
      </div>

      <span className="shine-sweep" />
    </button>
  );
}

