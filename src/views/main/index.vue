<template>
  <div class="flex h-full w-full flex-col">
    <div class="w-full h-20 bg-white z-10 fixed">
      <HeaderCard />
    </div>
    <div class="flex-1 flex w-full pt-20">
      <!-- 侧边 -->
      <div class="h-full w-48 bg-white">
        <AsideCard />
      </div>
      <div class="flex-1 h-full w-full bg-zinc-100">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderCard from './components/HeaderCard.vue';
import AsideCard from './components/AsideCard.vue';
</script>