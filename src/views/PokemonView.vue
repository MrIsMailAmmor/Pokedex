<template>
  <div class="m-auto text-center card w-fit self-center mt-5">
    <p class="text-xl uppercase font-bold">{{ name }}</p>
    <img
      :src="sprites.other['official-artwork']['front_default']"
      :alt="name"
      class="m-auto h-80"
    />
    Height : {{ height }}
    <br />
    Weight : {{ weight }}kg
    <br />
    <div class="flex m-auto w-fit">
      {{ types.length > 1 ? "Types" : "Type" }} :
      <ul class="flex">
        <li
          v-for="(type, index) in types"
          :key="index"
          class="font-normal uppercase ml-1"
          :style="pokemonTypeStyle(type.type.name)"
        >
          {{ type.type.name }}
        </li>
      </ul>
    </div>
    <br />
    <span class="uppercase"> Species : {{ species.name }} </span>
    <br />
    <div v-for="stat in stats" :key="stat.stat.name" class="flex items-center">
      <div class="w-24">{{ stat.stat.name }}</div>
      <div class="w-24">{{ stat.base_stat }}</div>
      <div class="flex-1 h-4 bg-red rounded overflow-hidden">
        <div
          :style="{ width: `${stat.base_stat}%` }"
          class="h-full bg-blue"
        ></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { myStore } from "@/store";
import { Pokemon } from "@/utils/interface";
import { pickColor } from "@/utils/utils";
const route = useRoute();
const store = myStore();
const id = parseInt(route.params.id as string);
const pokemon = store.getPokemonById(id) as Pokemon;
const { height, species, types, weight, name, stats, sprites } =
  pokemon as Pokemon;

const pokemonTypeStyle = (type: string) => {
  let background: string = pickColor(type);

  return {
    background,
    fontSize: "13px",
    padding: "3px",
    "border-radius": "5px",
    color: "white",
  };
};
</script>
<style lang=""></style>
