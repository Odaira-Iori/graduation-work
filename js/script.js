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









window.addEventListener('DOMContentLoaded', () => {
  const isFirstVisit = sessionStorage.getItem('visited') !== 'true';
  const isTopPage = location.pathname.endsWith('index.html') || location.pathname === '/';

  if (!isTopPage) {
    showLoading('patternB.mp4');
    return;
  }

  if (isFirstVisit) {
    showLoading('first-loading.mp4');
    sessionStorage.setItem('visited', 'true');
  } else {
    showLoading('loading.mp4');
  }
});

function showLoading(videoSrc) {
  document.body.style.overflow = 'hidden';

  const loading = document.createElement('div');
  loading.className = 'loading';
  loading.innerHTML = `
    <video id="loadingVideo" src="${videoSrc}" autoplay muted playsinline></video>
  `;
  document.body.appendChild(loading);

  const video = loading.querySelector('#loadingVideo');

  video.addEventListener('loadedmetadata', () => {
    const fadeDuration = 0.5; // フェードアウト時間（秒）
    const fadeStart = video.duration - fadeDuration;

    function checkTime() {
      if (video.currentTime >= fadeStart) {
        loading.classList.add('fade-out');
        setTimeout(() => {
          loading.remove();
          document.body.style.overflow = '';
        }, fadeDuration * 1000);
        video.removeEventListener('timeupdate', checkTime);
      }
    }

    video.addEventListener('timeupdate', checkTime);
  });
}
