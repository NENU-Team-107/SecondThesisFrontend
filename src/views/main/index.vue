<template>
  <div class="flex h-dvh w-dvw flex-col">
    <div class="w-full h-fit bg-white">
      <HeaderCard />
    </div>
    <div class="h-full flex-1 flex">
      <!-- 侧边 -->
      <div class="h-full w-fit bg-white">
        <AsideCard />
      </div>
      <div class="flex-1">
        内容
        <!-- <router-view/> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderCard from './components/HeaderCard.vue';
import AsideCard from './components/AsideCard.vue';
</script>