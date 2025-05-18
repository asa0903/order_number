<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
import type { CircleInfo, GameResult } from '../types/types';
import { DIFFICULTY_PARAM, DESIGN_PATTERNS, COLOR_PATTERNS } from '../constants/constants';
import { sleepMilliSeconds } from '../util/sleep';
import ResultDialog from './ResultDialog.vue';

// ルーター
const router = useRouter();
// 開始カウントダウン用
const count = ref<number>(3);
// 残り時間
const remainingSeconds = ref<number>(60);
// 現在の表示パターン
const currentCircles = ref<CircleInfo[]>([]);
// 正解or不正解 結果
const isCorrect = ref<boolean | null>(null);
// ゲーム結果
const gameResult = ref<GameResult>({
  correct: 0,
  wrong: 0
});
// リザルトダイアログ表示用
const isResultDialogVisible = ref<boolean>(false);

// 残り時間（表示用）
const secondsForDisplay = computed(() => {
  return formatTime(remainingSeconds.value);
});
// 残り秒数 文字色
const secondsColor = computed(() => {
  if(remainingSeconds.value <= 10) {
    return '#f11';
  }
  if(remainingSeconds.value <= 30) {
    return '#e50';
  }
  return '#111';
});
// 現在の難易度を示す
const difficultyIndex = computed(() => {
  if(gameResult.value.correct <= 5) {
    return 0;
  }else if(gameResult.value.correct <= 10) {
    return 1;
  }else if(gameResult.value.correct <= 15) {
    return 2;
  }else {
    return 3;
  }
});

/**
 * 最初の開始カウントダウン処理
 */
onMounted(() => {
  const intervalId = setInterval(() => {
    count.value = count.value - 1;
    // -1秒になったら終了（0秒のタイミングでStartを表示して、-1で非表示にするため）
    if(count.value <= -1) {
      clearInterval(intervalId);
      // ゲーム開始処理
      startGame();
    }
  }, 1000);
});

/**
 * 残り時間タイマー処理
 */
function startTimer(){
  const intervalId = setInterval(() => {
    remainingSeconds.value = remainingSeconds.value - 1;
    // 0秒になったら終了
    if(remainingSeconds.value <= 0) {
      clearInterval(intervalId);
      // ゲーム終了処理
      isResultDialogVisible.value = true;
    }
  }, 1000);
}

/**
 * ゲーム開始処理
 */
function startGame(){
  // 残り時間のカウントダウン開始
  startTimer();
  // 円を生成
  generateCircle();
}

/**
 * 円生成処理
 */
function generateCircle() {
  // 現状の円をリセット
  currentCircles.value = [];
  // ランダムでパターン定数から選択
  currentCircles.value = pickRandomPattern();
  // 色をランダムに設定
  currentCircles.value = configureRandomColor(currentCircles.value);
  // 数字をランダムに設定
  currentCircles.value = configureRandomNumber(currentCircles.value);
}

/**
 * ランダムでパターン定数から選択する処理
 */
function pickRandomPattern(): CircleInfo[] {
  const randomIndex = generateRandomNumber(DIFFICULTY_PARAM[difficultyIndex.value].patternIndex);
  return DESIGN_PATTERNS[randomIndex];
}

/**
 * ランダム背景色 設定処理
 */
function configureRandomColor(circles: CircleInfo[]): CircleInfo[] {
  const colorsSet: Set<string> = new Set<string>([]);
  do {
    // ループ用リセット
    colorsSet.clear();

    // 要素数分のランダム整数を生成する
    for (let i = 0; i < circles.length; i++) {
      const randomIndex = generateRandomNumber(COLOR_PATTERNS.length);
      colorsSet.add(COLOR_PATTERNS[randomIndex]);
    }

    // 生成された数字の要素数が、円の数と一致しないなら再度ランダム生成
    // 数字の重複をなくすための処理（Setにより、同じ数字が生成された場合、重複排除され、要素数が想定より少なくなるから）
  } while (colorsSet.size !== circles.length);

  // 色設定
  const colorsArray = Array.from(colorsSet);
  const coloredCircle: CircleInfo[] = circles.map((circle, index) => {
    return { ...circle, backgroundColor: colorsArray[index] };
  });

  return coloredCircle;
}

/**
 * ランダム整数設定処理
 * @param circles 変更前円パターン
 */
function configureRandomNumber(circles: CircleInfo[]): CircleInfo[] {
  const numbersSet: Set<number> = new Set<number>([]);
  do {
    // ループ用リセット
    numbersSet.clear();

    // 要素数分のランダム整数を生成する
    for (let i = 0; i < circles.length; i++) {
      numbersSet.add(generateRandomNumber(DIFFICULTY_PARAM[difficultyIndex.value].numberRange));
    }

    // 生成された数字の要素数が、円の数と一致しないなら再度ランダム生成
    // 数字の重複をなくすための処理（Setにより、同じ数字が生成された場合、重複排除され、要素数が想定より少なくなるから）
  } while (numbersSet.size !== circles.length);

  // 数字設定
  const numbersArray = Array.from(numbersSet);
  const configuredNumberCircle: CircleInfo[] = circles.map((circle, index) => {
    return { ...circle, number: numbersArray[index] };
  });

  return configuredNumberCircle;
}

/**
 * ランダム整数生成処理
 * @param numberRange ランダム範囲
 */
function generateRandomNumber(numberRange: number): number {
  return Math.floor(Math.random() * numberRange);
}

/**
 * ゲームをやめる処理
 */
function quitGame() {
  router.push('/');
}

/**
 * 秒数を表示用に変換
 * @param nowSeconds 現在秒数
 */
const formatTime = (nowSeconds: number): string => {
  // 秒数をミリ秒に変換してDateオブジェクトを作成
  const date = new Date(nowSeconds * 1000);

  // 分と秒を取得
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  // 分と秒を2桁に揃える
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  // 'mm:ss'形式に変換
  const formattedTime = `${formattedMinutes}:${formattedSeconds}`;
  return formattedTime;
};

/**
 * サークルクリック時処理
 * @param index クリックされた要素のindex
 */
async function onClickCircle(index: number){
  if(isCorrect.value !== null) {
    // ○ or × を画面に表示中の場合
    return;
  }

  // 判定
  const judgedResult = judgeCorrect(index);
  if(judgedResult) {
    // 正解の場合
    // クリックされた円を削除
    deleteClickedCircle(index);
    if(currentCircles.value.length <= 0) {
      // 全ての円が削除されている場合
      // 正解数を+1
      gameResult.value.correct++;
      // 正解表示
      isCorrect.value = true;
      await sleepMilliSeconds(500);
      // 再度円を生成
      generateCircle();
      // 正解非表示
      isCorrect.value = null;
    }
  }else {
    // 不正解の場合
    // 不正解数を+1
    gameResult.value.wrong++;
    // 不正解表示
    isCorrect.value = false;
    await sleepMilliSeconds(500);
    // 再度円を生成
    generateCircle();
    // 正解非表示
    isCorrect.value = null;
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

</script>

<template>
  <!-- ヘッダー部分 -->
  <header>
    <button class="quit-button" @click="quitGame">やめる</button>
    <h1 class="title">順番数字</h1>
    <p class="remaining-seconds" :style="{ color: secondsColor }">残り: {{ secondsForDisplay }}</p>
  </header>
  <!-- ゲーム部分 -->
  <div class="game">
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
    <div class="correct" v-if="isCorrect === true">
      〇
    </div>
    <div class="wrong" v-else-if="isCorrect === false">
      ×
    </div>
  </div>
  <!-- カウントダウン部分 -->
  <div v-if="count > -1" class="count-down">
    <div v-if="count > 0" :key="count">
      {{ count }}
    </div>
    <div v-else :key="'go'" class="go-text">
      Go!
    </div>
  </div>
  <!-- リザルトダイアログ部分 -->
  <ResultDialog v-if="isResultDialogVisible"
    :correct="gameResult.correct" :wrong="gameResult.wrong"/>
</template>

<style scoped>
/* ヘッダー */
header {
  /* レイアウト */
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 20%;
  margin: auto;
  /* デザイン */
  box-shadow: 0px 8px 16px -7px #777;
}
.title {
  font-size: 32px;
}
.remaining-seconds {
  /* レイアウト */
  margin-right: 8px;
  font-size: 20px;
  font-weight: 800;
}
.quit-button {
  /* レイアウト */
  margin-left: 8px;
  /* デザイン */
  border: none;
  color: #fff;
  background: #777;
  padding: 6px 14px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
}
.quit-button:hover {
  background: #333;
}

/* ゲーム部分 */
.game {
  /* レイアウト */
  position: relative;
  width: 100%;
  max-width: 500px;
  height: 80vh;
  margin: 20px auto;
}
.correct, .wrong {
  /* レイアウト */
  width: 100%;
  height: 50%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  /* デザイン */
  font-size: 256px;
  font-weight: 800;
  text-align: center;
}
.correct {
  color: #3F3;
}
.wrong {
  color: #F33;
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

/* カウントダウン部分 */
.count-down {
  /* レイアウト */
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0%;
  left: 0%;
  z-index: -1;
  /* デザイン */
  display: grid;
  place-items: center;
  font-size: 128px;
}
.go-text {
  color: #1a1;
  transform: scale(0);
  animation: scale 0.1s ease-out forwards;
}
@keyframes scale {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
.go-text::before {
  content: "";
  position: absolute;
  width: 300px;
  height: 300px;
  background-color: rgb(0, 255, 0, 0.3);
  border-radius: 50%;
  z-index: -1;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(0);
  animation: expand-fade 0.6s ease-out forwards;
}
@keyframes expand-fade {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0.8;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0;
  }
}

</style>
