<script setup lang="ts">
import { onMounted, ref, defineProps } from 'vue'
import { useRouter } from 'vue-router';
import type { GameResult } from '../types/types';
import { STORAGE_KEY, GAME_RESULT_KEY } from '../constants/constants';
import { sleepMilliSeconds } from '../util/sleep';


const router = useRouter();
// ゲーム結果（今回のスコア）
const props = defineProps<GameResult>();
// ポップアップ画面本体表示用
const showContent = ref<boolean>(false);
// 表示用今回のスコア
const score = ref<GameResult>({
  correct: 0,
  wrong: 0,
});
// 過去のベストスコア
const bestScore = ref<GameResult>({
  correct: 0,
  wrong: 0,
});
// ベストスコアテキスト表示用
const isUpdatedBestScore = ref<boolean>(false);

/**
 * 最初の処理
 */
onMounted(async () => {
  // ベストスコアを取得
  const bestScoreJson = localStorage.getItem(STORAGE_KEY.bestScore);
  if(bestScoreJson !== null) {
    // 値が入っていた場合
    bestScore.value = JSON.parse(bestScoreJson);
  }

  // 正解数がベストを超えているか
  const isNewHighScoreCorrect = bestScore.value.correct < props.correct;
  // 正解数が同じ場合、不正解数が減っているか
  const isNewHighScoreWrong =
    bestScore.value.correct === props.correct
    && bestScore.value.wrong > props.wrong;
  if(isNewHighScoreCorrect || isNewHighScoreWrong) {
    // 今回のスコアがベストスコアを超えていた場合
    // （下と分けているのは、セッション更新を早く行うため）
    // セッションの値を更新
    const scoreJson = JSON.stringify(props);
    localStorage.setItem(STORAGE_KEY.bestScore, scoreJson);
  }

  // ポップアップ画面本体表示（アニメーション用）
  showContent.value = true;

  // 今回の結果を表示
  await sleepMilliSeconds(1000);
  await countUp(GAME_RESULT_KEY.correct);
  await sleepMilliSeconds(500);
  await countUp(GAME_RESULT_KEY.wrong);
  await sleepMilliSeconds(500);

  if(isNewHighScoreCorrect || isNewHighScoreWrong) {
    // 今回のスコアがベストスコアを超えていた場合
    // 記録更新テキストを表示
    isUpdatedBestScore.value = true;
  }
});

/**
 * アニメーション用カウントアップ処理
 */
function countUp(key: string) {
  return new Promise<void>((resolve) => {
    if(key === GAME_RESULT_KEY.correct) {
      const intervalId = setInterval(() => {
        if(score.value.correct >= props.correct) {
          clearInterval(intervalId);
          resolve();
        }else {
          score.value.correct++;
        }
      }, 100);
    }else if(key === GAME_RESULT_KEY.wrong) {
      const intervalId = setInterval(() => {
        if(score.value.wrong >= props.wrong) {
          clearInterval(intervalId);
          resolve();
        }else {
          score.value.wrong++;
        }
      }, 100);
    }else {
      // 例外処理（いつか作る）
      console.log('ArgumentException countUp()');
    }
  });
};

/**
 * やめるボタン押下時処理
 */
function quitGame() {
  // スタート画面に戻る
  router.push('/');
};

/**
 * もう一度ボタン押下時処理
 */
function restartGame() {
  // ゲームリセット（画面更新）
  router.replace(`/game?restart=${Date.now()}`);
};

</script>

<template>
  <div class="popup">
    <transition name="popup-slide">
      <div class="result" v-show="showContent">
        <h1 class="title">リザルト</h1>
        <div class="score">
          <div class="row"><span class="correct label">正解：</span><span class="correct value">{{ score.correct }}</span></div>
          <div class="row"><span class="wrong label">不正解：</span><span class="wrong value">{{ score.wrong }}</span></div>
        </div>
        <div class="best-score">
          <div>ベストスコア</div>
          <div class="score">
            <div>正解：{{ bestScore.correct }}</div>
            <div>不正解：{{ bestScore.wrong }}</div>
          </div>
        </div>
        <transition name="bounce-in">
          <div class="new-record" v-show="isUpdatedBestScore">
            <div>記録更新！！</div>
          </div>
        </transition>
        <div class="button-container">
          <button @click="quitGame" class="quit-button">やめる</button>
          <button @click="restartGame" class="restart-button">もう一度</button>
        </div>
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
.result {
  /* レイアウト */
  width: 75%;
  max-width: 500px;
  height: 50%;
  max-height: 350px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  /* デザイン */
  background: #fff;
  box-shadow: 0px 0px 15px -3px #777;
  border-radius: 16px;
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

.score {
  height: 20%;
  font-size: 18px;
  font-weight: 800;
}
.score .row {
  display: flex;
  justify-content: center;
  align-items: center;
}
.score .row .label {
  display: block;
  width: 55%;
  text-align: right;
}
.score .row .value {
  display: block;
  width: 45%;
  text-align: left;
}
.correct {
  color: #4caf50;
}
.wrong {
  color: #f44336;
}
.best-score {
  color: #777;
  text-align: center;
}
.best-score .score {
  height: 20%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
}

.new-record {
  /* レイアウト */
  width: 100%;
  /* max-width: 140px; */
  height: 10%;
  margin: 16px auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  /* デザイン */
  /* border-radius: 8px; */
  background: linear-gradient(150deg, rgba(247, 166, 12, 1) 10%, rgba(255, 34, 87, 1) 40%, rgba(154, 39, 238, 1) 68%, rgba(35, 102, 247, 1) 90%);
  background-size: 200% 200%;
  color: #fff;
  font-weight: 800;
  animation: moveGradient 3s ease infinite;
}
.bounce-in-enter-active {
  animation: bounce-in 0.5s ease;
}
@keyframes moveGradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  60% {
    transform: scale(1.1);
    opacity: 1;
  }
  80% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}

.button-container {
  /* レイアウト */
  position: absolute;
  bottom: 8%;
  width: 100%;
  height: auto;
  margin: auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.restart-button {
  /* デザイン */
  border: none;
  background: #55f;
  padding: 8px 20px;
  cursor: pointer;
  display: grid;
  place-items: center;
  color: #fff;
  border-radius: 5px;
  font-size: 16px;
}
.restart-button:hover {
  /* デザイン */
  background: #11b;
  transition: 0.5s;
}
.quit-button {
  /* デザイン */
  border: none;
  color: #fff;
  background: #777;
  padding: 8px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
}
.quit-button:hover {
  background: #333;
  transition: 0.5s;
}

.popup-slide-enter-active {
  transition: all 1.0s ease;
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
