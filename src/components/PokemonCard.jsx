import TypeBadge from "./TypeBadge";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

export default function PokemonCard({ name, sprite, types }) {


  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <Link to={`/pokemon/${name}`} className="poke-card relative cursor-pointer text-center block hover:scale-105 transition">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite({ name, sprite, types });
        }}
        className="absolute top-2 right-2 text-2x1 z-20"
      >
        {isFavorite(name) ? "⭐" : "☆"}
      </button>
      <img
        src={sprite}
        alt={name}
        className="w-20 h-20 mx-auto mb-2"
      />
      <h2 className="text-lg font-bold capitalize mb-2">{name}</h2>
      <div className="flex justify-center gap-2">
        {types.map((type) => (
          <TypeBadge key={type} type={type} />
        ))}
      </div>
    </Link>
  );
}
