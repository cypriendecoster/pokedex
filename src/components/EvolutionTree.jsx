import EvolutionCard from "./EvolutionCard";

/**
 * Arbre d'évolution style Pokédex Nintendo
 * - tige verticale depuis le parent
 * - barre horizontale reliée aux enfants
 * - flèche + mini Pokéball à chaque branche
 */
export default function EvolutionTree({ node }) {
    if (!node) return null;

    return (
        <div className="flex flex-col items-center relative">
            {/* Carte du Pokémon courant */}
            <EvolutionCard
                name={node.name}
                imageUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${node.id}.png`}
            />

            {/* Branche vers les enfants */}
            {node.evolves_to?.length > 0 && (
                <div className="relative mt-4 w-full flex flex-col items-center">
                    {/* Tige verticale qui descend du parent */}
                    <div className="evo-line-v" />

                    {/* Barre horizontale centrale qui relie toutes les branches enfants */}
                    <div className="evo-line-h" />

                    {/* Enfants alignés */}
                    <div className="flex flex-wrap items-start justify-center gap-8 pt-6">
                        {node.evolves_to.map((child) => (
                            <div key={child.name} className="relative flex flex-col items-center">
                                {/* Flèche + Pokéball sur la branche enfant */}
                                <div className="relative flex flex-col items-center -mt-6">
                                    <div className="evo-branch-v" />
                                    <div className="evo-arrow" />
                                    <div className="evo-ball" />
                                </div>

                                {/* Conditions d’évolution (si présentes) */}
                                {Array.isArray(child.conditions) && child.conditions.length > 0 && (
                                    <div className="mb-2 mt-2 flex flex-wrap items-center justify-center gap-2 max-w-[240px]">
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
                </div>
            )}
        </div>
    );
}


