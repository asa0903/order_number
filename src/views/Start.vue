<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import HowToDialog from './HowToDialog.vue';

const router = useRouter();
// 遊び方画面表示
const isHowToVisible = ref<boolean>(false);

/**
 * スタートボタン押下時処理
 */
function gameStart() {
  // ゲーム画面遷移
  router.push('/game');
}

/**
 * 遊び方ボタン押下時処理
 */
function showHowTo() {
  // 遊び方画面表示
  isHowToVisible.value = !isHowToVisible.value;
}

</script>

<template>
  <div class="main">
    <h1 class="title">順番数字</h1>
    <button @click="gameStart" class="start-button">スタート</button>
    <button @click="showHowTo" class="howto-button">遊び方</button>
  </div>
  <HowToDialog v-if="isHowToVisible" @closeHowTo="showHowTo"/>
</template>

<style scoped>
.main {
  /* レイアウト */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 85vh;
  text-align: center;
}
.title {
  /* デザイン */
  font-size: 48px;
  font-weight: 800;
}
.start-button, .howto-button {
  /* デザイン */
  border: 2px solid #fff;
  outline: 2px solid #55f;
  background: #55f;
  margin-top: 8px;
  padding: 10px 40px;
  cursor: pointer;
  display: grid;
  place-items: center;
  color: #fff;
  border-radius: 10px;
  font-size: x-large;
}
.howto-button {
  margin-top: 30px;
}
.start-button:hover, .howto-button:hover {
  /* デザイン */
  border: 2px solid #55f;
  outline: 2px solid #fff;
  background: #fff;
  color: #55f;
  transition: 0.5s;
}
.slide-fade-enter-active {
  transition: all 0.4s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(50px); /* 下から上へ */
}
.slide-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
