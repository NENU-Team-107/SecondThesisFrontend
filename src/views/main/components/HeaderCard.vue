<template>
  <div class="py-1 flex flex-row justify-between items-center">
    <div class="flex flex-row">
      <img :src="titleImage" class="w-fit h-14">
      <div class="leading-loose h-14 px-4 my-auto text-2xl font-bold text-cyan-700">第二学位系统</div>
    </div>
    <div class="flex flex-row">
      <img :src="avatarImage" class="p-2 w-16 h-16 rounded-full mx-auto hover:cursor-pointer">
      <font-awesome-icon icon="fa-solid fa-right-from-bracket" class="px-4 my-auto h-7 w-7 hover:cursor-pointer"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import titleImage from '@/assets/image/nenu-title.png';
import avatarImage from '@/assets/image/avatar.png';
</script>