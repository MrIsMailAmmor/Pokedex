<template>
  <div class="flex">
    <PokemonFilterView />
    <div>
      <div class="grid grid-cols-3 gap-3 right-0 font-mono mt-5 ml-5">
        <div
          v-for="(pokemon, index) in pokemons"
          :key="index"
          class="bg-pink rounded-lg w-60 card"
        >
          <img
            :src="pokemon.sprites.other['official-artwork']['front_default']"
            alt="Product Image"
            class="h-15 w-full object-cover"
          />
          <div class="p-4">
            <hr class="text-white" />
            <h3
              class="text-xl font-light mb-2 text-white text-center uppercase"
            >
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
      </div>

      <Pagination
        :totalPages="totalPages"
        :changePage="changePage"
        :currentPage="Number(currentPage)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import Pagination from "@/components/footer/Pagination.vue";
import PokemonFilterView from "@/components/pokemonFilterView/PokemonFilterView.vue";
import { myStore } from "@/store";
import { Pokemon } from "@/utils/interface";
import { filterAndScoreData } from "@/utils/utils";
import { Ref, computed, watch, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const store = myStore();

store.setCurrentPage(+route.params.page);

const pokemons: Ref<Pokemon[]> = computed(() => {
  if (
    store.$state.pokemonFilters.pokemonTypes?.length >= 1 ||
    store.$state.pokemonFilters.pokemonWeight <= 1200 ||
    store.$state.pokemonFilters.searchName?.length > 2
  ) {
    const filteredData = filterAndScoreData(
      store.originalData,
      store.$state.pokemonFilters
    );
    store.setFilteredData(filteredData);
  }
  return store.getCurrentPageData;
});

watch(pokemons, (pokemons) => {
  if (pokemons.length === 0) {
    changePage(1);
  }
});

// Total number of pages
const totalPages = computed(() => {
  return store.getTotalPages;
});

// Function to change the current page
const changePage = (page: number) => {
  store.setCurrentPage(page);
  router.push({ params: { page: page.toString() } });
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
};

const currentPage = ref(route.params.page || store.currentPage);
</script>
<style lang=""></style>
