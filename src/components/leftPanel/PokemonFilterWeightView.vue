<template>
  <div>
    <div class="ml-8 text-2xl">
      <input
        type="checkbox"
        @change="handleFlagChange"
        data-test="weight-Flag"
        :checked="weightFlag"
      /><span class="text-base"> Weight Filter</span>
      <div v-if="weightFlag">
        <span class="font-mono font-base text-base">Weight less than </span>
        <input
          type="range"
          min="20"
          max="1200"
          :value="selectedWeight"
          @change="(e) => handleWeightChange(e)"
          class="ml-4 m-auto"
          data-test="selected-Weight"
        />
        <span class="font-bold text-base m-auto p-3">
          {{ selectedWeight }}kg
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "PokemonFilterWeightView",
  props: ["selectedWeight", "weightFlag"],
  emits: ["update:selectedWeight", "update:weightFlag"],
  methods: {
    handleFlagChange() {
      this.$emit("update:weightFlag", !this.weightFlag);
      this.$emit("update:selectedWeight", 20);
    },
    handleWeightChange(e: Event) {
      const target = e.target as HTMLInputElement;
      this.$emit("update:selectedWeight", Number(target.value));
    },
  },
};
</script>
<style lang=""></style>
