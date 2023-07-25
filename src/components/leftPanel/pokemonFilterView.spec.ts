// Filters.spec.js (or Filters.test.js)

import { mount } from "@vue/test-utils";
import { myStore } from "../../store";
import PokemonFilterViewVue from "./PokemonFilterView.vue";
import { createPinia, setActivePinia } from "pinia";
// import { ref } from "vue";
/**
 * @jest-environment jsdom
 */
describe("Filters Component", () => {
  // const uniquePokemonsType = ref<string[]>(["fire", "water", "grass"]);
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  // it("should update store on checking a checkbox", async () => {
  //   const store = myStore();
  //   const wrapper = mount(PokemonFilterViewVue, {
  //     attachTo: document.body,
  //   });

  //   wrapper.setData({ uniquePokemonsType });

  //   const checkbox = wrapper.find('input[data-test="grass"]');
  //   await checkbox.trigger("click");

  //   // Check if the store has been updated correctly
  //   expect(store.pokemonFilters.pokemonTypes).toHaveLength(1);
  // });

  it("should update store on changing weight filter", async () => {
    const store = myStore(); // Create the Pinia store instance
    const wrapper = mount(PokemonFilterViewVue, {
      attachTo: document.body,
    });
    // Find the weight filter checkbox
    const weightCheckbox = wrapper.find('input[data-test="weightFlag"]');
    expect(weightCheckbox).toBeDefined();

    await weightCheckbox.trigger("click");

    // Find the range input and set the value to 500
    const rangeInput = wrapper.find('input[data-test="selectedWeight"]');
    expect(rangeInput).toBeDefined();

    await rangeInput.setValue(500);
    // Check if the store has been updated correctly
    expect(store.pokemonFilters.pokemonWeight).toBe("500");
  });

  it("should update store on entering search input", async () => {
    const store = myStore(); // Create the Pinia store instance
    const wrapper = mount(PokemonFilterViewVue);
    // Find the search input element
    const searchInput = wrapper.find('input[type="text"]');

    // Enter a search term and trigger the input event
    await searchInput.setValue("Charizard");

    // Check if the store has been updated correctly
    expect(store.pokemonFilters.searchName).toBe("Charizard");
  });
});
