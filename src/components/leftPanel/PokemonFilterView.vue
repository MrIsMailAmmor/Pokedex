<template>
  <div
    class="leftPanel h-screen sticky top-0 bg-white mt-5 rounded-md font-bolder font-mono text-3xl md:block md:w-3/12 sm:w-4/12 lg:w-/12"
  >
    <div class="text-center">Filters</div>
    <div v-for="pokemonType in unique" :key="pokemonType" class="ml-4">
      <div>
        <input
          type="checkbox"
          :name="pokemonType"
          :value="pokemonType"
          class="ml-4"
          v-model="filterTypes"
        />
        <label :for="pokemonType" class="ml-4 text-base"
          >{{ pokemonType }}
        </label>
      </div>
    </div>
    {{ filterTypes }}
    <br />
    <div class="ml-4 text-2xl">
      <input type="checkbox" v-model="activateWeightFilter" /><span
        class="text-base"
      >
        Weight Filter</span
      >
      <div v-if="activateWeightFilter">
        <span class="font-mono font-base text-base">Weight less than </span>
        <input
          type="range"
          min="20"
          max="1200"
          v-model="selectedWeight"
          class="ml-4 m-auto"
        />
        <span class="font-bold text-base m-auto p-3">
          {{ selectedWeight }}kg
        </span>
      </div>
    </div>
    <div class="text-base ml-4">
      Search :
      <input
        type="text"
        name="searchName"
        v-model="searchName"
        class="placeholder:text-xs placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-2 pr-1 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm md:text-md sm:w-2/2"
        placeholder="Pokemon Search..."
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { myStore } from "@/store";
import { Pokemon } from "@/utils/interface";
import { ref, computed, watch, onUnmounted } from "vue";
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
  console.log(filterTypes);
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
const resetFilters = (
  pokemonTypes: string[] = [],
  pokemonWeight: number = 9999,
  searchName: string = ""
) => {
  store.setPokemonFilters({ pokemonTypes, pokemonWeight, searchName });
};

onUnmounted(() => {
  resetFilters();
});
</script>

<style></style>
