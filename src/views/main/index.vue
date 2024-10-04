<template>
  <div class="flex h-dvh w-dvw flex-col">
    <div class="w-full h-20 bg-white fixed z-10">
      <HeaderCard />
    </div>
    <div class="h-full flex-1 flex fixed top-20">
      <!-- 侧边 -->
      <div class="h-full w-48 bg-white">
        <AsideCard />
      </div>
      <div class="flex-1 fixed left-48 w-full h-full">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderCard from './components/HeaderCard.vue';
import AsideCard from './components/AsideCard.vue';
</script>