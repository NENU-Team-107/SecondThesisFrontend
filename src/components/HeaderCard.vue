<template>
  <div class="py-1 flex flex-row justify-between items-center">
    <div class="flex flex-row">
      <img :src="titleImage" class="w-fit h-14">
      <div class="leading-loose h-14 px-4 my-auto text-2xl font-bold text-indigo-900">{{ title }}</div>
    </div>
    <!-- <div class="flex flex-row">
      <font-awesome-icon color="#363ec9" icon="fa-solid fa-right-from-bracket" class="px-4 my-auto h-7 w-7 hover:cursor-pointer"/>
    </div> -->
  </div>
</template>
<script setup lang="ts">
// import titleImage from '@/assets/image/nenu-title.png';
const titleImage = require('@/assets/image/nenu-title.png');
const title = defineModel('title', {
  type: String,
  required: true,
});


</script>