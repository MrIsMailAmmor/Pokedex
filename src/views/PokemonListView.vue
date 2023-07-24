<template>
  <div class="flex">
    <PokemonFilterView />
    <div>
      <div
        class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 ease-in gap-3 right-0 font-mono mt-5 ml-5"
      >
        <PokemonCardView
          v-for="(pokemon, index) in pokemons"
          :key="index"
          :pokemon="pokemon"
        />
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
import PokemonFilterView from "@/components/leftPanel/PokemonFilterView.vue";
import PokemonCardView from "./PokemonCardView.vue";
import { myStore } from "@/store";
import { Pokemon } from "@/utils/interface";
import { filterAndScoreData } from "@/utils/utils";
import { Ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const store = myStore();

store.setCurrentPage(+route.params.page);

const pokemons: Ref<Pokemon[]> = computed(() => {
  if (
    store.$state.pokemonFilters.pokemonTypes?.length > 0 ||
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

// to check if the current page doesn't have any content
// use case be in page 3, use filter that will show only one page, we get empty page 3
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

// to follow the changes of the current page
const currentPage = computed(() => route.params.page || store.currentPage);
</script>
<style lang=""></style>
