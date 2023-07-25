import { setActivePinia, createPinia } from "pinia";
import { myStore } from ".";
jest.mock("../utils/utils", () => ({
  getInitialData: jest.fn().mockResolvedValue(Array(40)),
}));

describe("Getters", () => {
  let store: ReturnType<typeof myStore>;
  beforeEach(async () => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
    store = myStore();
    await store.setInitialData();
    // 25 pokemon per page means 2 pages with 40 pokemons
    expect(store.originalData).toEqual(Array(40));
  });

  it("get total page from store", () => {
    const pages = store.getTotalPages;

    expect(pages).toEqual(2);
  });

  it("get pages count when filters are on and filtered data is filled ", () => {
    store.setFilteredData(Array(60));
    // the condition is if there is filters we use filtered data instead of original data
    store.setPokemonFilters({
      pokemonTypes: ["grass", "earth", "flying"],
      pokemonWeight: 550,
      searchName: "bulbasaur",
    });

    const pages = store.getTotalPages;
    expect(pages).toEqual(3);
  });

  it("get current data with filters on", () => {
    const currentPageData = store.getCurrentPageData;

    expect(currentPageData).toEqual(Array(60));
  });
  it("get current data with filters off", () => {
    store.setPokemonFilters({
      pokemonTypes: [],
      pokemonWeight: 9999,
      searchName: "",
    });
    const currentPageData = store.getCurrentPageData;

    expect(currentPageData).toEqual(Array(40));
  });
});
