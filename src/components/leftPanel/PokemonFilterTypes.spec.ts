import { VueWrapper, mount } from "@vue/test-utils";
import PokemonFilterTypesVue from "./PokemonFilterTypes.vue";
describe("Pokemon Filter Types", () => {
  const modelValue: string[] = [];
  let wrapper: VueWrapper;
  beforeEach(() => {
    wrapper = mount(PokemonFilterTypesVue, {
      props: {
        uniquePokemonsType: ["fire", "grass", "water"],
        modelValue,
        "onUpdate:modelValue": (e: any) => wrapper.setProps({ modelValue: e }),
      },
      emits: ["update:modelValue"],
    });
  });

  it("mount", () => {
    const wrapper = mount(PokemonFilterTypesVue);
    expect(wrapper).toBeDefined();
  });

  it("has correct checkboxes", async () => {
    wrapper.vm.$emit("update:modelValue", ["fire"]);
    await wrapper.vm.$nextTick();
    const emitted = wrapper.emitted();
    expect(emitted["update:modelValue"].length).toBe(1);

    const fireCheckBox = wrapper.find('input[data-test="fire"]');
    expect(fireCheckBox).toBeDefined();

    await fireCheckBox.trigger("click");
    await wrapper.setProps({ modelValue: ["fire"] });

    expect(wrapper.props().modelValue).toStrictEqual(["fire"]);
  });
});
