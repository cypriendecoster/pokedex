import { useFavorites } from "../context/FavoritesContext";
import PokemonCard from "../components/PokemonCard";
import PokedexLayout from "../components/PokedexLayout";

export default function Favorites() {
    const { favorites } = useFavorites();

    return (
        <PokedexLayout>
            <h1 className="text-3xl font-bold mb-4 text-[var(--poke-blue)]">
                ⭐ Mes Pokémon Favoris
            </h1>

            {favorites.length === 0 ? (
                <p className="text-gray-600 text-center">Aucun favori pour le moment.</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {favorites.map((p) => (
                        <PokemonCard key={p.name} {...p} />
                    ))}
                </div>
            )}
        </PokedexLayout>
    );
}
