<template>
  <div class="h-full w-full">
    <div class="w-full h-20 bg-white z-10 fixed">
      <HeaderCard />
    </div>
    <div class="h-full w-48 bg-white pt-20 fixed z-9">
      <AsideCard />
    </div>
    <div class="h-fit bg-zinc-100 flex pl-48 pt-20 w-full">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderCard from './components/HeaderCard.vue';
import AsideCard from './components/AsideCard.vue';
</script>