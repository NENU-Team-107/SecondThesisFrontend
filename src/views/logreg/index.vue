<template>
  <!-- <div class="absolute inset-0 bg-black opacity-30"></div> -->
  <!-- <div class="absolute inset-0 bg-white"></div> -->
  <!-- <div class="flex justify-center items-center h-dvh w-dvw bg-nenu-bg bg-no-repeat bg-fixed bg-cover"> -->
    <div class="flex justify-center items-center h-dvh w-dvw bg-white">

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