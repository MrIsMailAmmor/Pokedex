<template>
  <div>
    <div
      v-memo="[uniquePokemonsType]"
      v-for="pokemonType in uniquePokemonsType"
      :key="pokemonType"
      class="ml-4"
    >
      <div>
        <input
          type="checkbox"
          :name="pokemonType"
          class="ml-4"
          @change="handleCheckboxChange(pokemonType)"
          :checked="modelValue && modelValue.includes(pokemonType)"
          :data-test="pokemonType"
        />
        <label :for="pokemonType" class="ml-4 text-base">{{
          pokemonType
        }}</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PokemonFilterTypes",
  props: ["uniquePokemonsType", "modelValue"],
  emits: ["update:modelValue"],
  methods: {
    handleCheckboxChange(pokemonType: string) {
      const selectedTypes = [...this.modelValue];
      const index = selectedTypes.indexOf(pokemonType);

      if (index === -1) {
        // Add the type to the selected types if it doesn't exist
        selectedTypes.push(pokemonType);
      } else {
        // Remove the type from the selected types if it already exists
        selectedTypes.splice(index, 1);
      }

      // Emit the updated selected types
      this.$emit("update:modelValue", selectedTypes);
    },
  },
});
</script>

<style lang=""></style>
