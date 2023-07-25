<template>
  <div
    class="leftPanel h-screen sticky top-0 bg-white mt-5 rounded-md font-bolder font-mono text-3xl md:block md:w-3/12 sm:w-3/12 lg:w-/12"
  >
    <div class="text-center">Filters</div>
    <PokemonFilterTypes
      v-model:modelValue="pokemonFilterTypes"
      :unique-pokemons-type="uniquePokemonsType"
      :pokemonFilterTypes="pokemonFilterTypes"
    />
    <br />
    <div class="ml-8 text-2xl">
      <input
        type="checkbox"
        v-model="weightFilterFlag"
        @onclick="pokemonSelectedWeight = 20"
        data-test="weightFlag"
      /><span class="text-base"> Weight Filter</span>
      <div v-if="weightFilterFlag">
        <span class="font-mono font-base text-base">Weight less than </span>
        <input
          type="range"
          min="20"
          max="1200"
          v-model="pokemonSelectedWeight"
          class="ml-4 m-auto"
          data-test="selectedWeight"
        />
        <span class="font-bold text-base m-auto p-3">
          {{ pokemonSelectedWeight }}kg
        </span>
      </div>
    </div>
    <div class="text-base md:ml-8 lg:flex mt-5">
      <span class="self-center pr-5"> Search </span>
      <input
        type="text"
        name="searchName"
        v-model="pokemonSearchByName"
        class="placeholder:text-xs placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-2 pr-1 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm md:text-md sm:w-2/2"
        placeholder="Pokemon Search..."
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { myStore } from "../../store";
import { Pokemon } from "@/utils/interface";
import { ref, computed, watch, onMounted } from "vue";
import PokemonFilterTypes from "./PokemonFilterTypes.vue";

const store = myStore();
const data = store.originalData;
const pokemonSelectedWeight = ref<number>(9999);
const pokemonSearchByName = ref("");
const pokemonFilterTypes = ref<string[]>([]);
const weightFilterFlag = ref(false);

const pokemonsTypes: string[] = data.flatMap((pokemon: Pokemon) => {
  if (pokemon.types.length > 1) {
    return pokemon.types.map((type) => type.type.name);
  }
  return [pokemon.types[0].type.name];
});

let uniquePokemonsType = [...new Set(pokemonsTypes)];

onMounted(() => {
  pokemonFilterTypes.value = store.pokemonFilters.pokemonTypes || [];
  weightFilterFlag.value = store.pokemonFilters.pokemonWeight <= 1200;
  pokemonSelectedWeight.value = store.pokemonFilters.pokemonWeight;
  pokemonSearchByName.value = store.pokemonFilters.searchName;
});

const typesFilter = computed(() => {
  return [...(pokemonFilterTypes.value || [])];
});
const weightFilterChange = computed(() => {
  return pokemonSelectedWeight.value;
});
const activateWeightFilterOption = computed(() => {
  return weightFilterFlag.value;
});
const nameSearchOption = computed(() => {
  return pokemonSearchByName.value;
});
watch(
  [
    typesFilter,
    weightFilterChange,
    activateWeightFilterOption,
    nameSearchOption,
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
