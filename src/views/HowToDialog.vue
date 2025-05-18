<script setup lang="ts">
import { defineEmits } from "vue";
import { onMounted, ref } from 'vue'
import type { CircleInfo } from '../types/types';
import { DEMO_PATTERNS } from '../constants/constants';


// ポップアップ画面本体表示用
const showContent = ref<boolean>(false)
// 画面非表示用イベントの定義
const emit = defineEmits(['closeHowTo']);
// 現在の表示パターン
const currentCircles = ref<CircleInfo[]>([]);

/**
 * 最初の処理
 */
onMounted(() => {
  // ポップアップ画面本体表示（アニメーション用）
  showContent.value = true;
  // デモ準備
  currentCircles.value = DEMO_PATTERNS[0].concat();
});

/**
 * サークルクリック時処理
 * @param index クリックされた要素のindex
 */
async function onClickCircle(index: number){
  // 判定
  const judgedResult = judgeCorrect(index);
  if(judgedResult) {
    // 正解の場合
    // クリックされた円を削除
    deleteClickedCircle(index);
  }else {
    // 不正解の場合
    // デモでは何もしない
  }
}

/**
 * 正誤判定
 * @param index クリックされた要素のindex
 */
function judgeCorrect(index: number): boolean {
  // クリックされた要素の数字を取得
  const clickedNumber: number = currentCircles.value[index].number;
  // currentCirclesの中で最小のnumberを取得
  const minNumber = Math.min(...currentCircles.value.map(circle => circle.number));
  // クリックされた要素のnumberが最小値と一致するか判定
  return clickedNumber === minNumber;
}

/**
 * 円の削除処理
 * @param index クリックされた要素のindex
 */
function deleteClickedCircle(index: number) {
  currentCircles.value.splice(index, 1);
}

/**
 * 遊び方画面を閉じる
 */
function closeHowTo() {
  emit('closeHowTo');
};

</script>

<template>
  <div class="popup">
    <transition name="popup-slide">
      <div class="howto" v-show="showContent">
        <h1 class="title">遊び方</h1>
        <div class="explanation">
          <p>小さい数字から順番にタップしていくゲーム</p>
          <p>制限時間60秒以内にどれだけクリアできるかな？</p>
          <p>※スマホでのプレイを推奨。</p>
        </div>
        <div class="demo">
          <transition-group name="fade-ring" tag="div">
            <div
              v-for="(circle, index) in currentCircles"
              :key="circle.number"
              class="circle"
              :style="circle"
              @click="onClickCircle(index)"
            >
              {{ circle.number }}
            </div>
          </transition-group>
        </div>
        <button @click="closeHowTo" class="close">×</button>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.popup {
  /* レイアウト */
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0%;
  left: 0%;
  /* デザイン */
  background: rgba(100, 100, 100, 0.4);
}
.howto {
  /* レイアウト */
  width: 75%;
  max-width: 500px;
  height: 60%;
  max-height: 360px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  /* デザイン */
  background: #fff;
  box-shadow: 0px 0px 15px -3px #777;
  border-radius: 16px;
}
.close {
  /* レイアウト */
  position: fixed;
  top: 0%;
  right: 0%;
  border: none;
  /* デザイン */
  width: 48px;
  height: 48px;
  background: #fff;
  font-size: 48px;
  margin-top: 8px;
  margin-right: 8px;
  padding: 0%;
  cursor: pointer;
}
.title {
  position: relative;
  text-align: center;
  color: #33f;
  font-weight: 800;
}
.title:after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 10%;
  height: 5px;
  border-radius: 5px;
  background: #33f;
}
.explanation {
  /* レイアウト */
  width: 80%;
  margin: auto;
  margin-top: 32px;
}

.demo {
  position: relative;
  width: 100%;
  margin: auto;
  background: red;
}
.circle {
  /* レイアウト */
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  /* デザイン */
  color: white;
  font-weight: bold;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0px 0px 15px -3px #777;
  box-sizing: border-box;
}
.fade-ring-leave-active {
  animation: popFadeRing 0.8s ease forwards;
}
@keyframes popFadeRing {
  0% {
    transform: scale(1);
    opacity: 1;
    border: none;
    box-shadow: none;
  }
  10% {
    transform: scale(0.0);
    border: 2px solid #111;
    opacity: 0.9;
  }
  20% {
    background-color: rgba(255, 255, 255, 0);
  }
  100% {
    transform: scale(1.2);
    background-color: white;
    border: 2px solid #111;
    opacity: 0;
  }
}

.popup-slide-enter-active {
  transition: all 0.4s ease;
}
.popup-slide-enter-from {
  transform: translateX(-50%) translateY(-40%);
  opacity: 0;
}
.popup-slide-enter-to {
  transform: translateX(-50%) translateY(-50%);
  opacity: 1;
}
</style>
