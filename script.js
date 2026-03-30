'use strict';

///////////////////////////////////////
// Modal window

const rem = parseInt(getComputedStyle(document.documentElement).fontSize);
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const message = document.createElement('div');
const header = document.querySelector('.header');

const nav = document.querySelector('.nav');
const footerNav = document.querySelector('.footer__nav');

const btnL = document.querySelector('.slider__btn--left');
const btnR = document.querySelector('.slider__btn--right');
const dotsContainer = document.querySelector('.dots');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    openModal();
  });
});

btnCloseModal.addEventListener('click', function (e) {
  e.preventDefault();
  closeModal();
});
overlay.addEventListener('click', function (e) {
  e.preventDefault();
  closeModal();
});

message.classList.add('cookie-message');
message.innerHTML = `
<h2>You Hacked Out</h2> <button class="btn">Got it!</button>
`;

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     e.preventDefault();
//     e.stopPropagation;
//     document
//       .querySelector(`${e.target.getAttribute('href')}`)
//       .scrollIntoView({ behavior: 'smooth' });
//   } else {
//   }
// });

const navHandle = function (e) {
  e.preventDefault();

  if (!e.target.classList.contains('nav__link')) return;
  const anc = e.target;
  const brothers = e.target
    .closest('.nav__links')
    .querySelectorAll('.nav__link');
  brothers.forEach(el => {
    if (el !== anc) el.style.opacity = this;
  });
};
const footerNavHandle = function (e) {
  e.preventDefault();
  if (!e.target.classList.contains('footer__link')) return;

  const link = e.target.closest('.footer__link');
  const links = e.target
    .closest('.footer__nav')
    .querySelectorAll('.footer__link');
  links.forEach(el => {
    if (el !== link) el.style.opacity = this;
  });
};

nav.addEventListener('mouseover', navHandle.bind(0.5));
nav.addEventListener('mouseout', navHandle.bind(1));
footerNav.addEventListener('mouseover', footerNavHandle.bind(0.5));
footerNav.addEventListener('mouseout', footerNavHandle.bind(1));

// operations >> warning
const btnCont = document.querySelector('.operations__tab-container');

btnCont.addEventListener('click', function (e) {
  e.preventDefault();

  // warning  >> moredn way to bbreak
  if (!e.target.closest('.operations__tab')) return;

  const target = e.target.closest('.operations__tab');
  const btns = e.target
    .closest('.operations__tab-container')
    .querySelectorAll('.operations__tab');

  btns.forEach(e => {
    if (e !== target) {
      e.classList.remove('operations__tab--active');
      document
        .querySelector(`.operations__content--${e.dataset.tab}`)
        .classList.remove('operations__content--active');
    } else {
      document
        .querySelector(`.operations__content--${e.dataset.tab}`)
        .classList.add('operations__content--active');
      e.classList.add('operations__tab--active');
    }
  });
});

const apiIntersectionObs = new IntersectionObserver(
  function (e) {
    e.forEach(z => {
      if (!z.isIntersecting) {
        nav.classList.add('sticky');
      } else {
        nav.classList.remove('sticky');
      }
    });
  },
  {
    root: null,
    threshold: 0,
    rootMargin: `${-nav.getBoundingClientRect().height}px`,
  },
);

apiIntersectionObs.observe(header);

const imgs = document.querySelectorAll('.features__img');

const apiForimgs = new IntersectionObserver(
  function (e, observer) {
    e.forEach(z => {
      if (z.isIntersecting) {
        z.target.setAttribute('src', z.target.dataset.src);

        // you better change the class and opacity
        // after the real picture will be loaded
        z.target.addEventListener('load', function (e) {
          z.target.classList.remove('lazy-img');
        });

        observer.unobserve(z.target);
      }
    });
  },
  {
    root: null,
    threshold: 0.7,
    rootMargin: `${8 * rem}px`,
  },
);

imgs.forEach(o => {
  apiForimgs.observe(o);
});

const Allsections = document.querySelectorAll('section');

const apiForDisplayAllSections = new IntersectionObserver(
  function (e, observer) {
    e.forEach(z => {
      if (!z.isIntersecting) return;
      z.target.classList.remove('section--hidden');
      observer.unobserve(z.target);
    });
  },
  {
    root: null,
    threshold: 0.15,
  },
);

Allsections.forEach(e => {
  e.classList.add('section--hidden');
  apiForDisplayAllSections.observe(e);
});

const slides = document.querySelectorAll('.slide');

slides.forEach((s, i) => {
  s.style.transform = `translateX(${i * 100}%)`;
});

let curSlide = 0;
let maxSlide = slides.length;

const changeSlide = function (curSS) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - curSS)}%)`;
  });

  const dots = document.querySelector('.dots').querySelectorAll('.dots__dot');
  dots.forEach(z => {
    if (z.dataset.slide == curSS) {
      z.classList.add('dots__dot--active');
    } else {
      z.classList.remove('dots__dot--active');
    }
  });
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  changeSlide(curSlide);
};

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  changeSlide(curSlide);
};

btnR.addEventListener('click', nextSlide);
btnL.addEventListener('click', prevSlide);

const slideSection = document.querySelector('.slider');

const apiForSlider = new IntersectionObserver(
  function (e) {
    e.forEach(z => {
      if (z.isIntersecting) {
        document.addEventListener('keydown', function (e) {
          if (e.key === 'ArrowRight') nextSlide();
          if (e.key === 'ArrowLeft') prevSlide();
        });
      }
    });
  },
  {
    root: null,
    threshold: 0,
  },
);

apiForSlider.observe(slideSection);

slides.forEach((e, i) => {
  // const theDot = document.createElement('div');
  // theDot.classList.add('dots__dot');
  // dotsContainer.appendChild(theDot);
  dotsContainer.insertAdjacentHTML(
    'beforeend',
    `
    <div class="dots__dot" data-slide="${i}"></div>`,
  );
});
changeSlide(0);

dotsContainer.addEventListener('click', function (e) {
  const t = e.target;
  if (t.classList.contains('dots__dot')) {
    curSlide = Number(t.dataset.slide);
    changeSlide(curSlide);
  }
});
