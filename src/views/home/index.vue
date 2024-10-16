<template>
  <div class="w-full h-full">
    <el-row class="h-80">
      <el-col :span="18"
      class="p-3"
      >
        <CalenderCard />
      </el-col>
      <el-col :span="6"
      class="p-3"
      >
        <NoticeCard />
      </el-col>
    </el-row>
    <el-row class="h-80">
      <el-col :span="18"
      class="p-3"
      >
        <MessageCard />
      </el-col>
      <el-col :span="6"
      class="p-3"
      >
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import CalenderCard from './components/CalenderCard.vue';
import NoticeCard from './components/NoticeCard.vue';
import MessageCard from './components/MessageCard.vue';
</script>
