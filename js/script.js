'use strict';

document.addEventListener('DOMContentLoaded', () => {
  /* 1. 모바일 메뉴 & 오버레이 제어 */
  const menuBtn = document.querySelector('.menu-toggle-btn');
  const mobileMenu = document.querySelector('#menu-mobile');
  const overlay = document.querySelector('#menu-overlay');

  const toggleMenu = () => {
    mobileMenu?.classList.toggle('active');
    overlay?.classList.toggle('active');
  };

  menuBtn?.addEventListener('click', toggleMenu);
  overlay?.addEventListener('click', toggleMenu);

  window.addEventListener('resize', () => {
    if (window.innerWidth > 850 && mobileMenu?.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      overlay?.classList.remove('active');
    }
  });

  /* 2. 배너 슬라이더 (루프 + 도트 연동) */
  const setupBannerSlider = () => {
    const bannerSection = document.querySelector('#banners');
    if (!bannerSection) return;

    const viewport = bannerSection.querySelector('.banners-viewport');
    const banners = bannerSection.querySelectorAll('.banner');
    const dots = bannerSection.querySelectorAll('.dots li');
    const leftBtn = bannerSection.querySelector('.left-arrow');
    const rightBtn = bannerSection.querySelector('.right-arrow');
    const total = banners.length;
    let currentIndex = 0;

    const updateDots = (index) => {
      dots.forEach((dot, i) => dot.classList.toggle('on', i === index));
    };

    const goToSlide = (index) => {
      let targetIndex = index;
      if (index < 0) targetIndex = total - 1; // 첫 번째에서 왼쪽 클릭 시 마지막으로
      if (index >= total) targetIndex = 0; // 마지막에서 오른쪽 클릭 시 첫 번째로

      banners[targetIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
      currentIndex = targetIndex;
      updateDots(currentIndex);
    };

    leftBtn?.addEventListener('click', () => goToSlide(currentIndex - 1));
    rightBtn?.addEventListener('click', () => goToSlide(currentIndex + 1));

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => goToSlide(i));
    });

    // 사용자가 직접 스크롤했을 때 도트 업데이트 (디바운싱 적용)
    let scrollTimer;
    viewport.addEventListener('scroll', () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const index = Math.round(viewport.scrollLeft / viewport.clientWidth);
        currentIndex = index;
        updateDots(index);
      }, 100);
    });
  };
  setupBannerSlider();

  /* 3. 일반 섹션 가로 스크롤 */
  const setupScroll = (selector) => {
    const section = document.querySelector(selector);
    if (!section) return;

    const container = section.querySelector('[class*="-container"]');
    const left = section.querySelector('.left-arrow');
    const right = section.querySelector('.right-arrow');

    if (container && left && right) {
      left.onclick = () => container.scrollBy({ left: -300, behavior: 'smooth' });
      right.onclick = () => container.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  ['#now-showing', '#events', '#offers', '#experiences'].forEach(setupScroll);

  /* 4. 스크롤바 표시/숨김 (시간 지나면 사라짐) */
  let isScrolling;
  window.addEventListener(
    'scroll',
    () => {
      document.body.classList.add('scrolling');
      window.clearTimeout(isScrolling);
      isScrolling = setTimeout(() => {
        document.body.classList.remove('scrolling');
      }, 1500);
    },
    { passive: true },
  );
});
