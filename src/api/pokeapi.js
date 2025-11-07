import axios from "axios";

const api = axios.create({
    baseURL: "https://pokeapi.co/api/v2",
});

export const getPokemonList = async (limit = 3000, offset = 0) => {
    const response = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
    return response.data.results;
}