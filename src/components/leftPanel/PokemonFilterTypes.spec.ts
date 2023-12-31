import { VueWrapper, mount } from "@vue/test-utils";
import PokemonFilterTypesVue from "./PokemonFilterTypes.vue";
describe("Pokemon Filter Types", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(PokemonFilterTypesVue, {
      props: {
        uniquePokemonsType: ["fire", "grass", "water"],
        modelValue: [],
        "onUpdate:modelValue": (e: Event) =>
          wrapper.setProps({ modelValue: e }),
      },
      emits: ["update:modelValue"],
    });
  });

  it("mounted", () => {
    const wrapper = mount(PokemonFilterTypesVue);
    expect(wrapper).toBeDefined();
  });

  it("emit an update of model value", async () => {
    wrapper.vm.$emit("update:modelValue", ["fire"]);
    await wrapper.vm.$nextTick();
    const emitted = wrapper.emitted();
    expect(emitted["update:modelValue"].length).toBe(1);
  });

  it("update model value correctly", async () => {
    const fireCheckBox = wrapper.find('input[data-test="fire"]');
    expect(fireCheckBox).toBeDefined();

    await fireCheckBox.setValue(true);
    expect(wrapper.props().modelValue).toStrictEqual(["fire"]);
  });
});
