import TypeBadge from "./TypeBadge";

export default function PokemonCard({ name, sprite, types }) {
  return (
    <div className="poke-card text-center">
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
    </div>
  );
}
