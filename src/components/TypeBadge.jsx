const colors = {
    grass: "bg-green-500",
    fire: "bg-red-500",
    water: "bg-blue-500",
    bug: "bg-lime-600",
    poison: "bg-purple-600",
    electric: "bg-yellow-400",
    normal: "bg-gray-400",
    ground: "bg-yellow-700",
    fairy: "bg-pink-400",
    fighting: "bg-orange-700",
    psychic: "bg-pink-600",
    rock: "bg-stone-500",
    ghost: "bg-indigo-700",
    ice: "bg-cyan-400",
    dragon: "bg-indigo-800",
    steel: "bg-gray-500",
    dark: "bg-zinc-800",
    flying: "bg-sky-300"
};

export default function TypeBadge({ type }) {
    return (
        <span className={`text-xs font-bold px-2 py-1 text-white rounded-full ${colors[type]}`}>
            {type}
        </span>
    );
}