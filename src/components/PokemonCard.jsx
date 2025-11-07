import TypeBadge from "./TypeBadge";
import { Link } from "react-router-dom";

export default function PokemonCard({ name, sprite, types }) {
  return (
    <Link to={`/pokemon/${name}`} className="poke-card text-center block hover:scale-105 transition">
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
