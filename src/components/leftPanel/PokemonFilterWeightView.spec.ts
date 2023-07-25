import { VueWrapper, mount } from "@vue/test-utils";
import PokemonFilterWeightViewVue from "./PokemonFilterWeightView.vue";

describe("Pokemon Filter Weight View", () => {
  let wrapper: VueWrapper;

  beforeEach(async () => {
    wrapper = mount(PokemonFilterWeightViewVue, {
      attachTo: document.body,
      props: {
        pokemonSelectedWeight: 9999,
        weightFlag: true,
      },
      emits: ["update:weightFlag", "update:selectedWeight"],
    });
  });

  it("mounted", async () => {
    expect(wrapper).toBeDefined();
  });

  it("found the input text and activate the flag", async () => {
    const weightFlagCheckbox = wrapper.find('input[data-test="weight-Flag"]');
    expect(weightFlagCheckbox).toBeDefined();

    await weightFlagCheckbox.setValue(false);

    let emitted = wrapper.emitted();

    expect(emitted["update:weightFlag"].length).toBe(1);
    expect(emitted["update:selectedWeight"].length).toBe(1);
  });

  it("change the value of the weight input", async () => {
    const rangeInput = wrapper.find('input[data-test="selected-Weight"]');
    expect(rangeInput).toBeDefined();
    await rangeInput.setValue(500);

    const emitted = wrapper.emitted();
    expect(emitted["update:selectedWeight"].length).toBe(1);
  });
});
