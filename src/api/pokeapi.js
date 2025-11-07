import axios from "axios";

const api = axios.create({
    baseURL: "https://pokeapi.co/api/v2",
});

export async function getPokemonList(limit = 1010) {
    const res = await api.get(`/pokemon?limit=${limit}`);
    const results = res.data.results;

    const detailedResults = await Promise.all(
        results.map(async (pokemon) => {
            const res = await axios.get(pokemon.url);

            return {
                id: res.data.id, // ✅ ajoute ID pour filtrer par génération
                name: res.data.name,
                sprite: res.data.sprites.other["official-artwork"].front_default,
                types: res.data.types.map((t) => t.type.name),
            };
        })
    );

    return detailedResults;
}



