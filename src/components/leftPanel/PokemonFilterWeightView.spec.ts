import { VueWrapper, mount } from "@vue/test-utils";
import PokemonFilterWeightViewVue from "./PokemonFilterWeightView.vue";

describe("Pokemon Filter Weight View", () => {
  let wrapper: VueWrapper;
  beforeEach(async () => {
    wrapper = mount(PokemonFilterWeightViewVue, {
      attachTo: document.body,
      props: {
        pokemonSelectedWeight: 9999,
        "onUpdate:pokemon-selected-weight": (e: any) =>
          wrapper.setData({ modelValue: e }),
      },
      data() {
        return {
          weightFilterFlag: false,
        };
      },
    });
    await wrapper.vm.$nextTick();
  });
  it("mounted", async () => {
    expect(wrapper).toBeDefined();
  });
  it("found the input text and activate the flag", async () => {
    const weightFlagCheckbox = wrapper.find('input[data-test="weightFlag"]');
    expect(weightFlagCheckbox).toBeDefined();

    await weightFlagCheckbox.setValue(true);
    const rangeInput = wrapper.find('input[data-test="selectedWeight"]');
    expect(rangeInput).toBeDefined();

    await rangeInput.setValue(500);
    const emitted = wrapper.emitted();
    expect(emitted["update:pokemon-selected-weight"].length).toBe(1);
  });
});
