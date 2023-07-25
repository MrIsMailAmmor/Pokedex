<template lang="">
  <div>
    <div
      v-for="pokemonType in uniquePokemonsType"
      :key="pokemonType"
      class="ml-4"
    >
      <div>
        <input
          type="checkbox"
          :name="pokemonType"
          class="ml-4"
          @change="$emit('update:modelValue', modelValue)"
          :checked="
            modelValue && modelValue.findIndex((t) => t === pokemonType) !== -1
          "
          :data-test="pokemonType"
        />
        <label :for="pokemonType" class="ml-4 text-base"
          >{{ pokemonType }}
        </label>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "PokemonFilterTypes",
  props: ["uniquePokemonsType", "modelValue"],
  emits: ["update:modelValue"],
  inheritAttrs: false,
};
</script>
<style lang=""></style>
