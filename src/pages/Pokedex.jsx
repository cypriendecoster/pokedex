import PokemonCard from "../components/PokemonCard";

export default function () {

    const fakePokemonList = ["bulbasaur", "charmander","squirtle", "pikachu"];

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4 text-[var(--poke-blue)]">
                Pokédex
            </h1>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"> 
                {fakePokemonList.map((name) => (
                    <PokemonCard key={name} name={name} />
                ))}
            </div>
        </div>
    );
}