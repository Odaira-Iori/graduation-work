document.querySelectorAll('header nav a').forEach(link => {
  if(link.href === window.location.href){
    link.classList.add('current');
  }
});


document.addEventListener('DOMContentLoaded', function () {
  // ヘッダーのスクロール制御
  const header = document.querySelector('header');
  let lastScrollY = window.pageYOffset;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.pageYOffset;

    if (currentScrollY === 0 || currentScrollY < lastScrollY) {
      header.classList.add('show');
    } else {
      header.classList.remove('show');
    }

    lastScrollY = currentScrollY;
  });

  // ハンバーガーメニュー制御
  const nav = document.getElementById('nav-wrapper');
  const hamburger = document.getElementById('js-hamburger');
  const blackBg = document.getElementById('js-black-bg');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      nav.classList.toggle('open');
      document.body.classList.toggle('nav-open');
    });

    if (blackBg) {
      blackBg.addEventListener('click', function () {
        nav.classList.remove('open');
        document.body.classList.remove('nav-open');
      });
    }
  }
});


/*console.log('JSは読み込まれてる？');

if (hamburger && nav) {
  hamburger.addEventListener('click', function () {
    console.log('🍔 クリックされたよ！');
    nav.classList.toggle('open');
    document.body.classList.toggle('nav-open');
    console.log('bodyのクラス →', document.body.className);
  });

  if (blackBg) {
    blackBg.addEventListener('click', function () {
      console.log('黒背景クリック → メニュー閉じ');
      nav.classList.remove('open');
      document.body.classList.remove('nav-open');
    });
  }
}*/



document.addEventListener('DOMContentLoaded', function () {
  const scrollBar = document.getElementById('scroll-bar');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const triggerPoint = window.innerHeight;

    if (window.innerWidth <= 768) {
      if (scrollY > triggerPoint) {
        scrollBar.classList.add('active');
      } else {
        scrollBar.classList.remove('active');
      }
    }
  });
});



document.addEventListener('DOMContentLoaded', function () {
  const backButton = document.querySelector('.back');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const triggerPoint = window.innerHeight;

    if (scrollY > triggerPoint) {
      backButton.classList.add('show');
    } else {
      backButton.classList.remove('show');
    }
  });
});





const isFirstVisit = !localStorage.getItem("visited");
    const isTopPage = window.location.pathname === "/" || window.location.pathname === "/index.html";

    const loader = document.getElementById("loader");
    const main = document.querySelector("main");
    const video = document.getElementById("loadingVideo");
    const videoSource = document.getElementById("videoSource");

    // 動画の分岐ロジック
    if (isFirstVisit && isTopPage) {
      videoSource.src = "first-loading.mp4"; // 初回＆トップページ用
      localStorage.setItem("visited", "true"); // フラグを立てておく
    } else {
      videoSource.src = "loading.mp4"; // 2回目以降 or 他のページ
    }

    // 動画の読み込みを反映
    video.load();

    // 動画が終わったら本編表示
    video.addEventListener("ended", () => {
      loader.style.display = "none";
      main.style.display = "block";
    });

    // ※ページをすぐ表示したいときは↓で強制非表示にもできる
    // video.addEventListener("loadeddata", () => {
    //   if (videoSource.src.includes("videoB.mp4")) {
    //     loader.style.display = "none";
    //     main.style.display = "block";
    //   }
    // });