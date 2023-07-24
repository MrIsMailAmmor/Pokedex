export interface PokemonApi {
  name: string;
  url: string;
}
interface Type {
  type: {
    name: string;
    url: string;
  };
}
export interface Pokemon {
  id: number;
  height: number;
  species: {
    name: string;
    url: string;
  };
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: Type[];
  weight: number;
  name: string;
  stats: {
    stat: {
      name: string;
    };
    base_stat: string;
  }[];
}

export interface Filter {
  pokemonTypes: string[];
  pokemonWeight: number;
  searchName: string;
}
