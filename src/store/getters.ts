import { Pokemon } from "@/utils/interface";
import { State } from "./interface";

export const getters = {
  getTotalPages(state: State) {
    if (
      state.pokemonFilters.pokemonTypes?.length > 0 ||
      state.pokemonFilters.pokemonWeight <= 1200 ||
      state.pokemonFilters.searchName?.length > 2
    ) {
      return Math.ceil(state.filteredData.length / state.itemsPerPage);
    }
    return Math.ceil(state.originalData.length / state.itemsPerPage);
  },
  getCurrentPageData(state: State) {
    const start = (state.currentPage - 1) * state.itemsPerPage;
    const end = start + state.itemsPerPage;
    if (
      state.pokemonFilters.pokemonTypes?.length > 0 ||
      state.pokemonFilters.pokemonWeight <= 1200 ||
      state.pokemonFilters.searchName?.length > 2
    ) {
      return [...state.filteredData.slice(start, end)];
    }
    return [...state.originalData.slice(start, end)];
  },
  getPokemonById(state: State) {
    return (id: number) => {
      return state.originalData.find((pok: Pokemon) => pok.id === id);
    };
  },
};
