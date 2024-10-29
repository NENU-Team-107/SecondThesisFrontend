<script lang="ts" setup>
import { AsideDetail } from '@/types/views';

const defaultPath = defineModel('DefaultPath', {
  required: true,
  type: String,
});

const asideList = defineModel('AsideList', {
  required: true,
  type: Array as () => AsideDetail[],
});

</script>
<template>
  <el-menu :default-active="defaultPath" :unique-opened="true" class="w-full h-full text-xl" router>
    <div v-for="item in asideList">
      <el-sub-menu v-if="item.children" :index="item.index">
        <template #title>
          <div class="flex items-center w-full p-2 text-xl font-body">
            <font-awesome-icon :icon="'fa-solid fa-' + item.icon" />
            <div class="ml-3 text-sm font-bold">{{ item.title }}</div>
          </div>
        </template>
        <el-menu-item :index="subitem.index" v-for="subitem in item.children">
          <div class="flex items-center m-3 w-16 h-full text-lg">
            <font-awesome-icon :icon="'fa-solid fa-' + subitem.icon" />
            <div class="ml-3 text-sm font-bold">{{ subitem.title }}</div>
          </div>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item v-else :index="item.index" class="flex items-center w-full p-2 text-xl font-body">
        <div class="flex items-center m-3 w-16 h-full text-lg">
          <font-awesome-icon :icon="'fa-solid fa-' + item.icon" />
          <div class="ml-3 text-sm font-bold">{{ item.title }}</div>
        </div>
      </el-menu-item>
    </div>
  </el-menu>
</template>