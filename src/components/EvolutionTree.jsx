import EvolutionCard from "./EvolutionCard";

export default function EvolutionTree({ node }) {
    if (!node) return null;

    return (
        <div className="flex flex-col items-center">
            {/* Carte du Pokémon courant */}
            <EvolutionCard
                name={node.name}
                imageUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${node.id}.png`}
            />

            {/* Enfants (évolutions) */}
            {node.evolves_to?.length > 0 && (
                <div className="mt-4 flex flex-wrap items-start justify-center gap-6 relative">
                    {/* Tige verticale depuis le parent */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-gray-400"></div>

                    {node.evolves_to.map((child) => (
                        <div key={child.name} className="flex flex-col items-center relative">
                            {/* Petite tige au-dessus de chaque enfant */}
                            <div className="absolute -top-3 w-px h-3 bg-gray-400"></div>

                            {/* Badges conditions d’évolution (s’il y en a) */}
                            {Array.isArray(child.conditions) && child.conditions.length > 0 && (
                                <div className="mb-2 flex flex-wrap items-center justify-center gap-2 max-w-[240px]">
                                    {child.conditions.map((c, i) => (
                                        <span
                                            key={i}
                                            className="text-[10px] sm:text-xs bg-white/80 backdrop-blur px-2 py-1 rounded-full border border-gray-200 shadow"
                                        >
                                            {c}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Sous-arbre récursif */}
                            <EvolutionTree node={child} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

