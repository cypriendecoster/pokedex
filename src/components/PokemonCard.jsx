export default function PokemonCard({ name }) {
    return (
        <div className="poke-card text-center">
            <div className="flex justify-center mb-2">
                <div className="w-20 h-20 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
            <h2 className="text-lg font-bold capitalize">{name}</h2>
            <p className="text-gray-500 text-sm">Chargement...</p>
        </div>
    );
}