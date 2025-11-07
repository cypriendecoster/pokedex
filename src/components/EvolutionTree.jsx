import EvolutionCard from "./EvolutionCard";

export default function EvolutionTree({ node, shiny = false }) {
  if (!node) return null;

  return (
    <div className="flex flex-col items-center relative">
      <EvolutionCard
        name={node.name}
        id={node.id}
        shiny={shiny}
      />

      {node.evolves_to?.length > 0 && (
        <div className="relative mt-4 w-full flex flex-col items-center">
          <div className="evo-line-v" />
          <div className="evo-line-h" />

          <div className="flex flex-wrap items-start justify-center gap-8 pt-6">
            {node.evolves_to.map((child) => (
              <div key={child.name} className="relative flex flex-col items-center">
                <div className="relative flex flex-col items-center -mt-6">
                  <div className="evo-branch-v" />
                  <div className="evo-arrow" />
                  <div className="evo-ball" />
                </div>

                {Array.isArray(child.conditions) && child.conditions.length > 0 && (
                  <div className="mb-2 mt-2 flex flex-wrap items-center justify-center gap-2 max-w-[240px]">
                    {child.conditions.map((cond, i) => (
                      <span
                        key={i}
                        className="text-[10px] sm:text-xs bg-white/90 backdrop-blur px-2 py-1 rounded-full border border-gray-300 shadow flex items-center gap-1"
                      >
                        <span>{cond.icon}</span> {cond.text}
                      </span>
                    ))}
                  </div>
                )}

                <EvolutionTree node={child} shiny={shiny} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}




