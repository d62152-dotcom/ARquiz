if (!sessionStorage.getItem('initialized')) {
  localStorage.setItem("bit", 0);
  localStorage.setItem("score", 0);
  localStorage.setItem("totalQuestion", 4);
  localStorage.setItem("AnserQuestion", 0);
  sessionStorage.setItem('initialized', 'true');
}

const marker01 = document.querySelector('#marker01');
const marker02 = document.querySelector('#marker02');
const marker03 = document.querySelector('#marker03');
const marker04 = document.querySelector('#marker04');
const ab1 = document.querySelector('#ab1');
const ab2 = document.querySelector('#ab2');
const ab3 = document.querySelector('#ab3');
const ab4 = document.querySelector('#ab4');

let test1 = localStorage.getItem("bit") || 0;
let bit = Number(test1);

function setButtonState(button, isActive) {
  if (isActive && button) {
    button.classList.remove('inactive');
    button.classList.add('active');
    button.disabled = false;
  }
}

// 答えてるか関数
function checkanswered(qn, bit) {
  return (bit & (1 << (qn - 1))) ? 1 : 0;
}

// ==========================================
// 【高速化の工夫1】クイズ画像の事前読み込み（プリロード）
// ==========================================
const quizImagesToPreload = [
  './Quiz/1/quiz1.html', // 遷移用
  './Quiz/4/gaikannoassyuku.png' // 各クイズで使う画像など
];

function preloadAssets() {
  // 次に答えるべき問題の画像をあらかじめキャッシュさせる
  const imagesToCache = [
    './images/marker/pattern-yanaseraion.png',
    './images/marker/pattern-syougajizou.png',
    './images/marker/pattern-syougatyan.png',
    './images/marker/pattern-senbeityan.png',
    './Quiz/4/gaikannoassyuku.png'
  ];

  imagesToCache.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// ページ読み込み完了時に自動実行
window.addEventListener('DOMContentLoaded', preloadAssets);


// ==========================================
// マーカー検知処理
// ==========================================
marker01.addEventListener('markerFound', () => {
  if (!checkanswered(1, bit)) {
    setButtonState(ab1, true);
    window.location.href = './Quiz/1/quiz1.html';
  }
});

marker02.addEventListener('markerFound', () => {
  if (!checkanswered(2, bit)) {
    setButtonState(ab2, true);
    window.location.href = './Quiz/2/quiz2.html';
  }
});

marker03.addEventListener('markerFound', () => {
  if (!checkanswered(3, bit)) {
    setButtonState(ab3, true);
    window.location.href = './Quiz/3/quiz3.html';
  }
});

marker04.addEventListener('markerFound', () => {
  if (!checkanswered(4, bit)) {
    setButtonState(ab4, true);
    window.location.href = './Quiz/4/quiz4.html';
  }
});

// 画像表示
const imgElement = document.getElementById("Images");
if (imgElement) {
  if (!checkanswered(1, bit)) {
    imgElement.src = "./images/marker/pattern-yanaseraion.png";
  } else if (!checkanswered(2, bit)) {
    imgElement.src = "./images/marker/pattern-syougajizou.png";
  } else if (!checkanswered(3, bit)) {
    imgElement.src = "./images/marker/pattern-syougatyan.png";
  } else if (!checkanswered(4, bit)) {
    imgElement.src = "./images/marker/pattern-senbeityan.png";
  }
}
