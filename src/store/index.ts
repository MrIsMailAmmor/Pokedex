import { StoreDefinition, defineStore } from "pinia";
import { state } from "./state";
import { getters } from "./getters";
import { Filter, Pokemon } from "../utils/interface";
import { getInitialData } from "../utils/utils";
import { Actions, Getters, State } from "./interface";

export const myStore: StoreDefinition<"myStore", State, Getters, Actions> =
  defineStore({
    id: "myStore",
    state,
    getters,
    actions: {
      // Set the current page
      setCurrentPage(page: number) {
        this.currentPage = page;
      },
      setPokemonFilters(filters: Filter) {
        this.pokemonFilters.pokemonTypes = filters.pokemonTypes;
        this.pokemonFilters.pokemonWeight = filters.pokemonWeight;
        this.pokemonFilters.searchName =
          (filters.searchName?.length > 2 && filters.searchName) || "";
      },
      setFilteredData(filteredData: Pokemon[]) {
        this.filteredData = filteredData;
      },
      async setInitialData() {
        this.originalData = await getInitialData();
      },
    },
  });
