import PokemonCard from "../components/PokemonCard";
import { useEffect, useState } from "react";
import { getPokemonList } from "../api/pokeapi";
import PokedexLayout from "../components/PokedexLayout";
import PokeLoader from "../components/PokeLoader";
import FilterBar from "../components/FilterBar";

export default function Pokedex() {
    const [pokemonList, setPokemonList] = useState([]);
    const [filteredPokemon, setFilteredPokemon] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [searchValue, setSearchValue] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedGen, setSelectedGen] = useState("");

    const [minHP, setMinHP] = useState(0);
    const [minAttack, setMinAttack] = useState(0);
    const [minDefense, setMinDefense] = useState(0);
    const [minSpAttack, setMinSpAttack] = useState(0);
    const [minSpDefense, setMinSpDefense] = useState(0);
    const [minSpeed, setMinSpeed] = useState(0);
    const [minTotalStats, setMinTotalStats] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const data = await getPokemonList();
            setPokemonList(data);
            setFilteredPokemon(data);
            setLoading(false);
        }
        fetchData();
    }, []);

    useEffect(() => {
        let result = pokemonList;

        if (searchValue) {
            result = result.filter((p) =>
                p.name.toLowerCase().includes(searchValue.toLowerCase())
            );
        }

        if (selectedType) {
            result = result.filter((p) => p.types.includes(selectedType));
        }

        const genRanges = {
            1: [1, 151], 2: [152, 251], 3: [252, 386], 4: [387, 493],
            5: [494, 649], 6: [650, 721], 7: [722, 809], 8: [810, 898], 9: [899, 1010]
        };

        if (selectedGen) {
            const [min, max] = genRanges[selectedGen];
            result = result.filter((p) => p.id >= min && p.id <= max);
        }

        if (minHP) result = result.filter((p) => p.stats.hp >= minHP);
        if (minAttack) result = result.filter((p) => p.stats.attack >= minAttack);
        if (minDefense) result = result.filter((p) => p.stats.defense >= minDefense);
        if (minSpAttack) result = result.filter((p) => p.stats.special_attack >= minSpAttack);
        if (minSpDefense) result = result.filter((p) => p.stats.special_defense >= minSpDefense);
        if (minSpeed) result = result.filter((p) => p.stats.speed >= minSpeed);

        if (minTotalStats) {
            result = result.filter((p) => {
                const total = Object.values(p.stats).reduce((a, b) => a + b, 0);
                return total >= minTotalStats;
            });
        }

        setFilteredPokemon(result);
    }, [
        searchValue, selectedType, selectedGen,
        minHP, minAttack, minDefense, minSpAttack, minSpDefense, minSpeed, minTotalStats,
        pokemonList
    ]);

    if (loading) return <PokeLoader />;

    return (
        <PokedexLayout>
            <h1 className="text-3xl font-bold mb-4 text-[var(--poke-blue)]">Pokédex</h1>

            <FilterBar
                searchValue={searchValue} setSearchValue={setSearchValue}
                selectedType={selectedType} setSelectedType={setSelectedType}
                selectedGen={selectedGen} setSelectedGen={setSelectedGen}
                minHP={minHP} setMinHP={setMinHP}
                minAttack={minAttack} setMinAttack={setMinAttack}
                minDefense={minDefense} setMinDefense={setMinDefense}
                minSpAttack={minSpAttack} setMinSpAttack={setMinSpAttack}
                minSpDefense={minSpDefense} setMinSpDefense={setMinSpDefense}
                minSpeed={minSpeed} setMinSpeed={setMinSpeed}
                minTotalStats={minTotalStats} setMinTotalStats={setMinTotalStats}
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filteredPokemon.map((pokemon) => (
                    <PokemonCard key={pokemon.id} {...pokemon} />
                ))}
            </div>
        </PokedexLayout>
    );
}







