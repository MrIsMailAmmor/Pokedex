// Filters.spec.js (or Filters.test.js)

import { mount } from "@vue/test-utils";
import { createPinia } from "pinia"; // Replace with the correct store path
import { myStore } from "@/store";
import PokemonFilterViewVue from "@/components/leftPanel/PokemonFilterView.vue";

describe("Filters Component", () => {
  const uniquePokemonsType = ["fire", "water", "grass"];

  it("should update store on checking a checkbox", async () => {
    const pinia = createPinia();
    const store = myStore(); // Create the Pinia store instance
    const wrapper = mount(PokemonFilterViewVue, {
      props: {
        uniquePokemonsType,
      },
      global: {
        plugins: [pinia],
      },
    });
    // Find the first checkbox and simulate clicking it
    const checkbox = wrapper.find('input[type="checkbox"]');
    await checkbox.trigger("click");

    // Check if the store has been updated correctly
    expect(store.pokemonFilters.pokemonTypes).toHaveLength(1);
  });

  it("should update store on changing weight filter", async () => {
    const store = myStore(); // Create the Pinia store instance
    const pinia = createPinia();
    const wrapper = mount(PokemonFilterViewVue, {
      props: {
        uniquePokemonsType,
      },
      global: {
        plugins: [pinia], // Use the Pinia store in the tests
      },
    });
    // Find the weight filter checkbox
    const weightCheckbox = wrapper.find('input[type="checkbox"]');
    await weightCheckbox.trigger("click");

    // Find the range input and set the value to 500
    const rangeInput = wrapper.find('input[type="range"]');
    await rangeInput.setValue(500);

    // Check if the store has been updated correctly
    expect(store.pokemonFilters.pokemonWeight).toBe(500);
  });

  it("should update store on entering search input", async () => {
    const store = myStore(); // Create the Pinia store instance
    const pinia = createPinia();
    const wrapper = mount(PokemonFilterViewVue, {
      props: {
        uniquePokemonsType,
      },
      global: {
        plugins: [pinia], // Use the Pinia store in the tests
      },
    });
    // Find the search input element
    const searchInput = wrapper.find('input[type="text"]');

    // Enter a search term and trigger the input event
    await searchInput.setValue("Charizard");

    // Check if the store has been updated correctly
    expect(store.pokemonFilters.searchName).toBe("Charizard");
  });
});
