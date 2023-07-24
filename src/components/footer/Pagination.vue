<template lang="">
  <div class="flex justify-center mb-5">
    <li
      v-for="page in totalPages"
      :key="page"
      @click="changePage(page)"
      :class="{ activePage: page === currentPage }"
      class="flex items-center justify-center px-3 h-8 ml-1 rounded-sm leading-tight text-gray-md bg-white border border-gray-low hover:bg-gray-sm hover:text-gray-lg"
    >
      <router-link :to="{ params: { page } }">{{ page }}</router-link>
    </li>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  totalPages: Number;
  changePage: (page: number) => void;
  currentPage: number;
}>();
</script>
<style lang=""></style>
