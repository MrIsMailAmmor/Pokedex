import { Pokemon, PokemonApi } from "./interface";

export const fetchPokedex = async () => {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=150&offset=0",
    {
      method: "GET",
      headers: { "Accept-type": "application/json" },
    }
  ).then((res) => res.json());

  return response.results;
};

export const fetchPokemonsData = () => {
  return new Promise<Pokemon[]>(async (resolve, _) => {
    const pokemons = await fetchPokedex();
    let pokemonsData: Pokemon[] = pokemons.map((pokemon: PokemonApi) => {
      const pokemonData = fetch(pokemon.url, {
        method: "GET",
        headers: { "Accept-type": "application/json" },
      }).then((res) =>
        res
          .json()
          .then(
            ({ id, height, species, sprites, types, weight, name, stats }) => {
              return {
                id,
                height,
                species,
                sprites,
                types,
                weight,
                name,
                stats,
              };
            }
          )
      );
      return pokemonData;
    });
    return Promise.all(pokemonsData).then((res) => {
      localStorage.setItem("data", JSON.stringify(res));
      resolve(res);
    });
  });
};
