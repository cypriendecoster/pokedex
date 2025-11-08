import axios from "axios";

const api = axios.create({
    baseURL: "https://pokeapi.co/api/v2",
});

export async function getPokemonList(limit = 200) {
    const res = await api.get(`/pokemon?limit=${limit}`);
    const results = res.data.results;

    const detailedResults = await Promise.all(
        results.map(async (pokemon) => {
            const res = await axios.get(pokemon.url);

            return {
                id: res.data.id,
                name: res.data.name,
                sprite: res.data.sprites.other["official-artwork"].front_default,
                types: res.data.types.map((t) => t.type.name),
                stats: {
                    hp: res.data.stats[0].base_stat,
                    attack: res.data.stats[1].base_stat,
                    defense: res.data.stats[2].base_stat,
                    special_attack: res.data.stats[3].base_stat,
                    special_defense: res.data.stats[4].base_stat,
                    speed: res.data.stats[5].base_stat,
                }
            };
        })
    );

    return detailedResults;
}







