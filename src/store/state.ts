import { Filter, Pokemon } from "@/utils/interface";
import { State } from "./interface";

export const state = (): State => ({
  originalData: [] as Pokemon[],
  filteredData: [] as Pokemon[],
  currentPage: 1,
  itemsPerPage: 25,
  pokemonFilters: {} as Filter,
});
