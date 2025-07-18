document.addEventListener('DOMContentLoaded', function () {
  // ナビリンクのcurrentクラス切り替え
  document.querySelectorAll('header nav a').forEach(link => {
    const linkPath = new URL(link.href).pathname;
    const currentPath = window.location.pathname;

    if (
      linkPath === currentPath ||
      (linkPath === '/' && (currentPath === '/' || currentPath === '/index.html'))
    ) {
      link.classList.add('current');
    }
  });

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

  // ページ遷移時のリンクに対してイベントを仕込む
  const links = document.querySelectorAll('a[href]');
  links.forEach(link => {
    // 外部リンクや同一ページ内リンクはスキップ
    const href = link.getAttribute('href');
    if (
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      link.target === '_blank'
    ) return;

    link.addEventListener('click', e => {
      e.preventDefault(); // デフォルトのリンク遷移を止める

      showLoading('loading.mp4', () => {
        // 再生終了後に遷移
        window.location.href = link.href;
      });
    });
  });

  // index.html の最初の表示だけファーストローディング
  if (isTopPage && isFirstVisit) {
    sessionStorage.setItem('visited', 'true');
    showLoading('first-loading.mp4');
  }
});

function showLoading(videoSrc, onEndCallback) {
  // スクロール禁止
  document.body.style.overflow = 'hidden';

  // すでにローディング中なら無視
  if (document.querySelector('.loading')) return;

  const loading = document.createElement('div');
  loading.className = 'loading';
  loading.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: #faf6ee;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  loading.innerHTML = `
    <video id="loadingVideo" src="${videoSrc}" autoplay muted playsinline></video>
  `;
  document.body.appendChild(loading);

  const video = loading.querySelector('#loadingVideo');

  video.addEventListener('ended', () => {
    loading.classList.add('fade-out');
    setTimeout(() => {
      loading.remove();
      document.body.style.overflow = '';

      // コールバックがあれば実行（リンク遷移など）
      if (typeof onEndCallback === 'function') {
        onEndCallback();
      }
    }, 500); // フェードアウト時間
  });
}
