<template>
  <div
    class="leftPanel w-4/12 h-screen sticky top-0 bg-white mt-5 rounded-md font-bolder font-mono text-3xl"
  >
    <div class="text-center">Filters</div>
    <div v-for="type in unique" :key="type" class="ml-4">
      <input
        type="checkbox"
        :id="type"
        :value="type"
        v-model="filterTypes"
        class="ml-4"
      />
      <label :for="type" class="ml-4 text-base">{{ type }} </label>
    </div>
    <br />
    <div class="ml-4 text-2xl">
      <input type="checkbox" v-model="activateWeightFilter" /><span
        class="text-base"
      >
        Weight Filter</span
      >
      <div v-if="activateWeightFilter">
        <span class="font-mono font-bold">Weight : </span>
        <input
          type="range"
          min="20"
          max="1200"
          v-model="selectedWeight"
          class="ml-4"
        />
        <span class="ml-4 font-bold">
          {{ selectedWeight }}
        </span>
      </div>
    </div>
    <div class="text-base ml-4">
      Search :
      <input
        type="text"
        name="searchName"
        v-model="searchName"
        class="placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm w-6/12"
        placeholder="Search for anything..."
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { myStore } from "@/store";
import { Pokemon } from "@/utils/interface";
import { ref, computed, watch } from "vue";
const store = myStore();
const data = store.originalData;

const pokemonTypes: string[] = data.flatMap((pokemon: Pokemon) => {
  if (pokemon.types.length > 1) {
    return pokemon.types.map((type) => type.type.name);
  }
  return [pokemon.types[0].type.name];
});

let unique = [...new Set(pokemonTypes)];

const selectedWeight = ref(900);
const searchName = ref("");
const filterTypes = ref<string[]>([]);
const activateWeightFilter = ref(false);

const typesFilter = computed(() => {
  return [...filterTypes.value];
});
const weightFilterChange = computed(() => {
  return selectedWeight.value;
});
const activateWeightFilterOption = computed(() => {
  return activateWeightFilter.value;
});
const nameSearchOption = computed(() => {
  return searchName.value;
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
