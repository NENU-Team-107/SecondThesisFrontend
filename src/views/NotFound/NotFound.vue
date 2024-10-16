<template>
  <div class="shell">
    <div class="hit-the-floor-404">404</div>
    <div>
      <div class="text-3xl">:(</div>
      <div>您似乎来到了不存在的页面，</div>
      <div>请检查您输入的网址，</div>
      <div>或者<span class="text-blue-400 font-semibold cursor-pointer" @click="back"> 点击这里 </span>返回首页或登陆页</div>
    </div>
  </div>
</template>
<style scoped>
.shell {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background: #f1f1f1;
}
.hit-the-floor-404 {
  color: #fff;
  font-size: 10em;
  font-weight: bold;
  font-family: Helvetica;
  text-shadow:
    0 1px 0 #ccc,
    0 2px 0 #c9c9c9,
    0 3px 0 #bbb,
    0 4px 0 #b9b9b9,
    0 5px 0 #aaa,
    0 6px 1px rgba(0, 0, 0, .1),
    0 0 5px rgba(0, 0, 0, .1),
    0 1px 3px rgba(0, 0, 0, .3),
    0 3px 5px rgba(0, 0, 0, .2),
    0 5px 10px rgba(0, 0, 0, .25),
    0 10px 10px rgba(0, 0, 0, .2),
    0 20px 20px rgba(0, 0, 0, .15);
}

.hit-the-floor-404 {
  text-align: center;
}
</style>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const back = () => {
  router.push('/');
};

</script>