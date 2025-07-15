window.onload = function () {
    var nav = document.getElementById('nav-wrapper');
    var hamburger = document.getElementById('js-hamburger');
    var blackBg = document.getElementById('js-black-bg');

    hamburger.addEventListener('click', function () {
        nav.classList.toggle('open');
        document.body.classList.toggle('nav-open'); // ←追加！
    });
    blackBg.addEventListener('click', function () {
        nav.classList.remove('open');
        document.body.classList.remove('nav-open'); // ←追加！
    });
};



(function () {
    document.addEventListener('DOMContentLoaded', function() { // HTML解析が終わったら
      const btn = document.getElementById('dropdown__btn'); // ボタンをidで取得
      if(btn) { // ボタンが存在しないときにエラーになるのを回避
        btn.addEventListener('click', function(){ //ボタンがクリックされたら
          this.classList.toggle('is-open'); // is-openを付加する
        });
      }
    });
  }());

  window.onload = function () {
  // ハンバーガーメニューの開閉
  const nav = document.getElementById('nav-wrapper');
  const hamburger = document.getElementById('js-hamburger');
  const blackBg = document.getElementById('js-black-bg');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      nav.classList.toggle('open');
    });

    blackBg?.addEventListener('click', function () {
      nav.classList.remove('open');
    });
  }

  // ドロップダウンメニューの開閉
  const dropdownButtons = document.querySelectorAll('.dropdown__btn');

  dropdownButtons.forEach(function (button) {
    button.addEventListener('click', function (event) {
      event.stopPropagation();

      // 他のメニューを閉じる
      dropdownButtons.forEach(function (btn) {
        if (btn !== button) {
          btn.classList.remove('is-open');
          const body = btn.nextElementSibling;
          if (body) body.style.display = 'none';
        }
      });

      const dropdownBody = button.nextElementSibling;
      if (dropdownBody) {
        if (button.classList.contains('is-open')) {
          button.classList.remove('is-open');
          dropdownBody.style.display = 'none';
        } else {
          button.classList.add('is-open');
          dropdownBody.style.display = 'block';
        }
      }
    });
  });

  // メニュー外クリックでドロップダウン閉じる
  document.addEventListener('click', function () {
    dropdownButtons.forEach(function (button) {
      button.classList.remove('is-open');
      const dropdownBody = button.nextElementSibling;
      if (dropdownBody) dropdownBody.style.display = 'none';
    });
  });
};
