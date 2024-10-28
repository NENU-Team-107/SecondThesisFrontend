<template>
    <div class="flex h-dvh w-dvw flex-col">
        <div class="w-full h-fit bg-white">
            <HeaderCard />
        </div>
        <div class="h-full flex-1 flex">
            <div class="h-full bg-white">
                <AsideCard />
            </div>
            <div class="flex-1">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import HeaderCard from './components/HeaderCard.vue';
import AsideCard from './components/AsideCard.vue';
</script>