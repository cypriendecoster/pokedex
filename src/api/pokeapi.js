import axios from "axios";

const api = axios.create({
    baseURL: "https://pokeapi.co/api/v2",
});

export const getPokemonList = async (limit = 151, offset = 0) => {
    const response = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
    const results = response.data.results;

    const detailedResults = await Promise.all(
        results.map(async (pokemon) => {
            const res = await axios.get(pokemon.url);

            return {
                name: pokemon.name, //récupération des noms
                sprite: //récupération des sprites
                    res.data.sprites.other["official-artwork"].front_default ||
                    res.data.sprites.front_default,
                types: res.data.types.map((t) => t.type.name) // récupération des types 
            };
        })
    );

    return detailedResults;
};


