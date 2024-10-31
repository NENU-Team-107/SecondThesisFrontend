<template>
  <div class="flex px-5 pt-5 flex-col bg-neutral-100 rounded-xl shadow-lg h-auto ease-in-out duration-500">
    <el-image :src="titleImage" :key="titleImage" class="w-96 mb-5" />
    <div class="w-full max-w-md px-2 py-4 sm:px-0">
      <TabGroup>
        <TabList class="flex space-x-1 rounded-xl bg-blue-800/80 p-1">
          <Tab v-for="category in categories" as="template" :key="category.key" v-slot="{ selected }">
            <button :class="[
              'w-full rounded-lg py-2.5 font-bold leading-3',
              'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none',
              selected
                ? 'bg-white text-black font-semibold shadow'
                : 'text-white hover:bg-white/[0.12] hover:text-white',
            ]">
              {{ category.content }}
            </button>
          </Tab>
        </TabList>

        <TabPanels class="mt-2">
          <TabPanel key="login" :class="[
            'rounded-xl bg-white p-3',
            'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none',
          ]">
            <LoginCardCover />
          </TabPanel>
          <TabPanel key="register" :class="[
            'rounded-xl bg-white p-3',
            'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none',
          ]">
            <RegisterCard />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
import LoginCardCover from './cards/LoginCardCover.vue';
import RegisterCard from './cards/RegisterCard.vue';
// import titleImage from '@/assets/image/nenu-title.png';
const titleImage = require('@/assets/image/nenu-title.png');

const categories = ref({
  'login': {
    key: 'login',
    title: '登录',
    content: '登录'
  }
  ,
  'register': {
    key: 'register',
    title: '注册',
    content: '注册'
  }
});

</script>

<style scoped></style>