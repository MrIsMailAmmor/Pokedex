<script setup lang="ts">
import Navbar from "./components/navbar/TheNavbar.vue";
import { fetchPokedex } from "./utils/PublicApi";
fetchPokedex();
</script>

<template>
  <Navbar />
  <RouterView></RouterView>
</template>

<style scoped></style>
