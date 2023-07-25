<template>
  <div>
    Gotcha, just a way to redirect to the pokemons page without clicking you
    know :)
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
router.push({ name: "PokemonListView", params: { page: 1 } });
</script>
<style lang=""></style>
