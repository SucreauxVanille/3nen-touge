// =====================
// 要素取得
// =====================
const startScreen = document.getElementById("startScreen");
const startButton = document.getElementById("startButton");

const timerText = document.getElementById("timer");
const player = document.getElementById("player");
const scoreText = document.getElementById("score");
const message = document.getElementById("message");
const ground = document.getElementById("ground");
const resultScreen = document.getElementById("resultScreen");
const retryButton = document.getElementById("retryButton");
const finalScore = document.getElementById("finalScore");

let groundX = 0;
// =====================
// GIF設定
// =====================

const WALK_GIF = "walk.gif";
const FALL_GIF = "fall.gif";
const STAND_GIF = "stand.gif";


// =====================
// 状態管理
// =====================
let gameStarted = false;
let timer = 20;
let state = "walk";
let score = 0;


// =====================
// 初期表示
// =====================

player.src = WALK_GIF;

//ゲーム開始
startButton.addEventListener("click", startGame);
function startGame() {

  gameStarted = true;

  startScreen.classList.add("hidden");

  message.textContent = "！ころべ！";
  message.classList.add("blink");

  startTimer();

}

// =====================
// ランダム時間
// 0.4〜1.1秒
// =====================

function randomTime() {
  return 300 + Math.random() * 700;
}

//タイマー
function startTimer() {

  const interval = setInterval(() => {

    timer--;

    timerText.textContent = timer;

    if (timer <= 0) {

      clearInterval(interval);

      endGame();

    }

  }, 1000);

}

//背景ループ
function gameLoop() {

  // 歩行中だけスクロール
if (state === "walk")  {

    groundX -= 4;

    ground.style.backgroundPositionX = `${groundX}px`;

  }

  requestAnimationFrame(gameLoop);

}

// =====================
// 転倒処理
// =====================

player.addEventListener("click", () => {

  // 歩行中以外は無効
  if (state !== "walk") return;
  if (!gameStarted) return;
  // 状態変更
  state = "fall";

message.textContent = "ころんだ！";
message.classList.remove("blink");

  // スコア加算
  score += 3;
  scoreText.textContent = score;

  // GIF変更
  player.src = FALL_GIF;

  console.log("ころんだ！");


  // =====================
  // 起き上がりへ
  // =====================

  setTimeout(() => {

    state = "stand";
state = "stand";

message.textContent = "";

player.src = STAND_GIF;

    console.log("立ち上がり中");


    // =====================
    // 歩行へ戻る
    // =====================

    setTimeout(() => {

state = "walk";

message.textContent = "！ころべ！";
message.classList.add("blink");

player.src = WALK_GIF;
      console.log("歩行再開");

    }, randomTime());

  }, randomTime());

});

//終了
document.addEventListener("click", () => {

  if (!gameEnded) return;

  resetGame();

});
function endGame() {

  gameStarted = false;

  message.textContent = "おしまい";
  message.classList.remove("blink");

  finalScore.textContent = score;

  resultScreen.classList.remove("hidden");

}

//リセット
retryButton.addEventListener("click", resetGame);
function resetGame() {

  // 数値リセット
  score = 0;
  timer = 20;

  // 表示更新
  scoreText.textContent = score;
  timerText.textContent = timer;

  // 状態初期化
  state = "walk";

  // GIF戻す
  player.src = WALK_GIF;

  // メッセージ戻す
  message.textContent = "！ころべ！";

  // リザルト非表示
  resultScreen.classList.add("hidden");

  // スタート画面表示
  startScreen.classList.remove("hidden");

}
gameLoop();
