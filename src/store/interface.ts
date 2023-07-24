import { Filter, Pokemon } from "@/utils/interface";

export interface State {
  originalData: Pokemon[];
  filteredData: Pokemon[];
  currentPage: number;
  itemsPerPage: number;
  pokemonFilters: Filter;
}
