// =====================
// 要素取得
// =====================

const player = document.getElementById("player");
const scoreText = document.getElementById("score");


// =====================
// GIF設定
// =====================

const WALK_GIF = "img/walk.gif";
const FALL_GIF = "img/fall.gif";
const STAND_GIF = "img/stand.gif";


// =====================
// 状態管理
// =====================

let state = "walk";
let score = 0;


// =====================
// 初期表示
// =====================

player.src = WALK_GIF;


// =====================
// ランダム時間
// 0.8〜1.2秒
// =====================

function randomTime() {
  return 800 + Math.random() * 400;
}


// =====================
// 転倒処理
// =====================

player.addEventListener("click", () => {

  // 歩行中以外は無効
  if (state !== "walk") return;

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
