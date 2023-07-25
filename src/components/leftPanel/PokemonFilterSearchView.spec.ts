import { VueWrapper, mount } from "@vue/test-utils";
import PokemonFilterSearchViewVue from "./PokemonFilterSearchView.vue";

describe("Pokemon Filter Search View", () => {
  const modelValue = "";
  let wrapper: VueWrapper;
  beforeAll(() => {
    wrapper = mount(PokemonFilterSearchViewVue, {
      props: {
        modelValue,
        "onUpdate:modelValue": (e: Event) =>
          wrapper.setProps({ modelValue: e }),
      },
      emits: ["update:modelValue"],
    });
  });
  it("mounted", () => {
    expect(wrapper).toBeDefined();
  });
  it("should find the input and type", async () => {
    // Find the search input element
    const searchInput = wrapper.find('input[type="text"]');
    expect(searchInput).toBeDefined();
    // Enter a search term and trigger the input event
    await searchInput.setValue("Charizard");
  });
  it("should receive an event", async () => {
    const emitted = wrapper.emitted();

    expect(emitted["update:modelValue"].length).toBe(1);
  });
});
