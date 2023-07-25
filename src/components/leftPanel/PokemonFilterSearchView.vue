<template>
  <div class="text-base md:ml-8 lg:flex mt-5">
    <span class="self-center pr-5"> Search </span>
    <input
      type="text"
      name="searchName"
      :value="modelValue"
      @input="(e:Event) =>onInputChange(e )"
      class="placeholder:text-xs placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-2 pr-1 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm md:text-md sm:w-2/2"
      placeholder="Pokemon Search..."
    />
  </div>
</template>
<script lang="ts">
export default {
  name: "PokemonFilterSearchView",
  props: ["modelValue"],
  emits: ["update:modelValue"],
  methods: {
    onInputChange(event: Event) {
      const target = event.target as HTMLInputElement;
      this.$emit("update:modelValue", target.value);
    },
  },
};
</script>
<style lang=""></style>
