import EvolutionCard from "./EvolutionCard";

export default function EvolutionTree({ node }) {
    if (!node) return null;

    return (
        <div className="flex flex-col items-center">
            {/* Pokémon */}
            <EvolutionCard
                name={node.name}
                imageUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${node.id}.png`}
            />

            {/* Si évolutions */}
            {node.evolves_to?.length > 0 && (
                <div className="flex gap-6 mt-4 relative">
                    {/* Lignes horizontales */}
                    <div className="absolute -top-3 left-1/2 w-px h-3 bg-gray-400 -translate-x-1/2"></div>
                    {node.evolves_to.map((child) => (
                        <div key={child.name} className="flex flex-col items-center relative">
                            {/* Ligne verticale */}
                            <div className="absolute -top-3 w-px h-3 bg-gray-400"></div>

                            <EvolutionTree node={child} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
