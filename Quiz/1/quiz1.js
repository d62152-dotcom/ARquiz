// ARマーカー/画像検出時のイベント処理例
function onARTargetFound() {
  // マーカーを検出したら「問題に進む」カードを表示
  const startCard = document.getElementById("start-card");
  if (startCard) {
    startCard.style.display = "block";
  }
}

// 「問題に進む」ボタンが押された時の処理
function startQuizFromAR() {
  // 1. ARオーバーレイとカメラ画面を隠す
  document.getElementById("ar-overlay").style.display = "none";
  document.getElementById("ar-camera-container").style.display = "none";

  // 2. クイズ全体コンテナを表示
  document.getElementById("container").style.display = "block";

  // 3. クイズ問題を読み込んで初期化表示
  loadQuestion();
}

// 例：MindAR や AR.js のターゲット認識イベントに紐付ける場合
// mindarTarget.addEventListener("targetFound", () => {
//   onARTargetFound();
// });