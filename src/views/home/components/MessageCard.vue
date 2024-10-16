<template>
  <div class="w-full h-full bg-white p-3 shadow-md text-center">
    <div class="flex justify-between items-center">
      <div class="text-lg font-bold">消息</div>
      <div class="flex items-center">
        <el-button type="text" icon="el-icon-edit" circle></el-button>
        <el-button type="text" icon="el-icon-refresh" circle></el-button>
      </div>
    </div>
    <div class="mt-3">
      <el-card>
        <div class="text-lg font-bold">消息标题</div>
        <div class="text-sm text-gray-500">消息内容</div>
        <div class="text-sm text-gray-500">2021-09-01 12:00:00</div>
      </el-card>
    </div>
  </div>
</template>