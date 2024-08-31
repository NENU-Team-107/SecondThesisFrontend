<template>
  <div class="absolute inset-0 bg-black opacity-30"></div>
  <div class="flex justify-center items-center h-dvh w-dvw bg-nenu-bg">
    <div class="relative isolate px-6 pt-14 lg:px-8">
      <div class="h-fit">
        <TabCard />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TabCard from '@/views/logreg/components/TabCard.vue';
</script>