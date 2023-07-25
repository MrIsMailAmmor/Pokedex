<template>
  <div>
    <div class="ml-8 text-2xl">
      <input
        type="checkbox"
        v-model="weightFilterFlag"
        @onclick="handleFlagChange"
        data-test="weightFlag"
      /><span class="text-base"> Weight Filter</span>
      <div v-if="weightFilterFlag">
        <span class="font-mono font-base text-base">Weight less than </span>
        <input
          type="range"
          min="20"
          max="1200"
          @change="(e) => handleWeightChange(e)"
          class="ml-4 m-auto"
          data-test="selectedWeight"
        />
        <span class="font-bold text-base m-auto p-3"> {{ modelValue }}kg </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "PokemonFilterWeightView",
  props: ["modelValue"],
  emits: ["update:modelValue"],
  data() {
    return {
      weightFilterFlag: false,
    };
  },
  methods: {
    handleFlagChange() {
      this.$emit("update:modelValue", 20);
    },
    handleWeightChange(e: any) {
      this.$emit("update:modelValue", Number(e.target.value));
    },
  },
};
</script>
<style lang=""></style>
