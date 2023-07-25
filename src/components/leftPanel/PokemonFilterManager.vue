<template>
  <div
    class="leftPanel h-screen sticky top-0 bg-white mt-5 rounded-md font-bolder font-mono text-3xl md:block md:w-3/12 sm:w-3/12 lg:w-/12"
  >
    <div class="text-center">Filters</div>
    <PokemonFilterTypes
      v-model:modelValue="pokemonFilterTypes"
      :unique-pokemons-type="uniquePokemonsType"
    />
    <br />
    <PokemonFilterWeightView
      v-model:selectedWeight="pokemonSelectedWeight"
      v-model:weightFlag="weightFilterFlag"
    />
    <PokemonFilterSearchView v-model;model-value="pokemonSearchByName" />
  </div>
</template>

<script setup lang="ts">
import { myStore } from "../../store";
import { Pokemon } from "@/utils/interface";
import { ref, watch, onBeforeMount } from "vue";
import PokemonFilterTypes from "./PokemonFilterTypes.vue";
import PokemonFilterWeightView from "./PokemonFilterWeightView.vue";
import PokemonFilterSearchView from "./PokemonFilterSearchView.vue";

const store = myStore();
const originalData = store.originalData;

const pokemonSelectedWeight = ref<number>(9999);
const pokemonSearchByName = ref("");
const pokemonFilterTypes = ref<string[]>([]);
const weightFilterFlag = ref(false);

const pokemonsTypes: string[] = originalData.flatMap((pokemon: Pokemon) => {
  if (pokemon.types.length > 1) {
    return pokemon.types.map((type) => type.type.name);
  }
  return [pokemon.types[0].type.name];
});

let uniquePokemonsType = [...new Set(pokemonsTypes)];

onBeforeMount(() => {
  pokemonFilterTypes.value = store.pokemonFilters.pokemonTypes || [];
  weightFilterFlag.value = store.pokemonFilters.pokemonWeight <= 1200;
  pokemonSelectedWeight.value = store.pokemonFilters.pokemonWeight;
  pokemonSearchByName.value = store.pokemonFilters.searchName;
});

watch(
  [
    pokemonFilterTypes,
    pokemonSelectedWeight,
    weightFilterFlag,
    pokemonSearchByName,
  ],
  ([types, weight, flagWeight, searchName]) => {
    filterPokemons(types, !flagWeight ? 9999 : weight, searchName);
  }
);

const filterPokemons = (
  pokemonTypes: string[],
  pokemonWeight: number,
  searchName: string
) => {
  store.setPokemonFilters({ pokemonTypes, pokemonWeight, searchName });
};
</script>

<style></style>
