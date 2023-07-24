<template>
  <div class="bg-pink rounded-lg w-60 sm:w-48">
    <img
      :src="pokemon.sprites.other['official-artwork']['front_default']"
      alt="Product Image"
      class="h-15 w-full object-cover"
    />
    <div class="p-4">
      <hr class="text-white" />
      <h3 class="text-xl font-light mb-2 text-white text-center uppercase">
        {{ pokemon.name }}
      </h3>
    </div>
    <div class="m-auto w-fit">
      <router-link
        :to="`/pokemonView/${pokemon.id}`"
        class="bg-white text-pink px-4 py-2 rounded-md hover:bg-blue hover:text-white hover:animate-bounce"
      >
        View Details
      </router-link>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Pokemon } from "@/utils/interface";
defineProps<{
  pokemon: Pokemon;
}>();
</script>
<style lang=""></style>
