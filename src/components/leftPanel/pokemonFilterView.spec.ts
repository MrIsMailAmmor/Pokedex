import { VueWrapper, mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import PokemonFilterViewVue from "./PokemonFilterView.vue";
// import { ref } from "vue";
/**
 * @jest-environment jsdom
 */
describe("Filters Component", () => {
  let wrapper: VueWrapper;
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it("renders correctly", () => {
    wrapper = mount(PokemonFilterViewVue);
    expect(wrapper).toBeDefined();
  });
});
