import { VueWrapper, mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import PokemonFilterManagerVue from "./PokemonFilterManager.vue";
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
    wrapper = mount(PokemonFilterManagerVue);
    expect(wrapper).toBeDefined();
  });

  it("find the title Filter", () => {
    expect(wrapper.text()).toContain("Filters");
  });
});
