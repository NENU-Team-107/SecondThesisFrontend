<template>
    <div
        :class="fipped ? 'bg-white relative w-full py-auto duration-500 h-32rem' : 'bg-white relative w-full py-auto duration-500 h-80'">
        <div v-if="!fipped" :class="fipped ? 'front-fipped' : 'front'">
            <LoginCard v-model="fipped" />
        </div>
        <div v-else :class="fipped ? 'back-fipped' : 'back'">
            <ResetPwdCard v-model="fipped" />
        </div>
    </div>
</template>

<style scoped>
.h-32rem {
    height: 32rem;
}

.front {
    box-sizing: border-box;
    perspective: 1000px;
    backface-visibility: hidden;
    transition: 0.6s ease-in-out;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: white;
    z-index: 2;
    margin: auto;
}

.front-fipped {
    box-sizing: border-box;
    perspective: 1000px;
    transition: 0.6s ease-in-out;
    backface-visibility: hidden;
    position: absolute;
    transform: rotateY(180deg);
    width: 100%;
    height: 100%;
    background-color: white;
    z-index: 1;
    margin: auto;
}

.back {
    perspective: 1000px;
    transition: 0.6s ease-in-out;
    backface-visibility: hidden;
    position: absolute;
    transform: rotateY(-180deg);
    width: 100%;
    height: 100%;
    background-color: white;
    z-index: 1;
    margin: auto;
}

.back-fipped {
    perspective: 1000px;
    transition: 0.6s ease-in-out;
    backface-visibility: hidden;
    position: absolute;
    transform: rotateY(0deg);
    width: 100%;
    height: 100%;
    background-color: white;
    z-index: 1;
    margin: auto;
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import LoginCard from "./LoginCard.vue";
import ResetPwdCard from "./ResetPwdCard.vue";

const fipped = ref(false);
</script>