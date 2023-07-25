import { setActivePinia, createPinia } from "pinia";
import { myStore } from ".";

describe("State", () => {
  let store: ReturnType<typeof myStore>;
  beforeEach(async () => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
    store = myStore();
  });

  it("should have the states initiated", () => {
    expect(store.$state).toEqual({
      originalData: [],
      filteredData: [],
      currentPage: 1,
      itemsPerPage: 25,
      pokemonFilters: {},
    });
  });
});
