import { Filter, Pokemon } from "@/utils/interface";

export interface State {
  originalData: Pokemon[];
  filteredData: Pokemon[];
  currentPage: number;
  itemsPerPage: number;
  pokemonFilters: Filter;
}

export interface Getters {
  getTotalPages(state: State): number;
  getCurrentPageData(state: State): Pokemon[];
  getPokemonById(state: State): (id: number) => Pokemon | undefined;
}
export interface Actions {
  setCurrentPage(page: number): void;
  setPokemonFilters(filters: Filter): void;
  setFilteredData(filteredData: Pokemon[]): void;
  setInitialData(): Promise<void>;
}
