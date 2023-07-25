import { setActivePinia, createPinia } from "pinia";
import { myStore } from ".";
import { Pokemon } from "@/utils/interface";

jest.mock("../utils/utils", () => ({
  getInitialData: jest
    .fn()
    .mockResolvedValue([{ id: 1 }, { id: 2 }, { id: 3 }]),
}));

describe("Actions", () => {
  let store: ReturnType<typeof myStore>;
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
    store = myStore();
  });

  it("set current page", () => {
    store.setCurrentPage(5);
    expect(store.currentPage).toEqual(5);
  });
  it("set the filter", () => {
    store.setPokemonFilters({
      pokemonTypes: ["grass", "earth", "flying"],
      pokemonWeight: 550,
      searchName: "bulbasaur",
    });
    expect(store.pokemonFilters.pokemonTypes).toEqual([
      "grass",
      "earth",
      "flying",
    ]);
    expect(store.pokemonFilters.pokemonWeight).toEqual(550);
    expect(store.pokemonFilters.searchName).toEqual("bulbasaur");
  });
  it("set the filtered data", () => {
    store.setFilteredData([{ id: 1 }, { id: 2 }] as Pokemon[]);
    expect(store.filteredData.length).toEqual(2);
  });

  it("set the initial data", async () => {
    await store.setInitialData();
    expect(store.originalData).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
  });
});
