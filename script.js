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
let gameEnded = false;

// =====================
// 初期表示
// =====================

player.src = WALK_GIF;

//ゲーム開始
startButton.addEventListener("click", startGame);
function startGame() {

  gameStarted = true;

  startScreen.classList.add("hidden");

  startTimer();

}

// =====================
// ランダム時間
// 0.4〜1.1秒
// =====================

function randomTime() {
  return 400 + Math.random() * 700;
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
  if (gameStarted && state === "walk") {

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

    player.src = STAND_GIF;

    console.log("立ち上がり中");


    // =====================
    // 歩行へ戻る
    // =====================

    setTimeout(() => {

      state = "walk";

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
  gameEnded = true;

  state = "stop";

  message.textContent = "タップで再挑戦";

}

//リセット
function resetGame() {

  gameEnded = false;

  score = 0;
  timer = 20;

  scoreText.textContent = score;
  timerText.textContent = timer;

  state = "walk";

  player.src = WALK_GIF;

  message.textContent = "！ころべ！";

  startScreen.classList.remove("hidden");

}

gameLoop();
