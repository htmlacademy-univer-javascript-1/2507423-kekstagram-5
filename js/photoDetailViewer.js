import './thumbnailRender.js';

const picturesElement = document.querySelector('.pictures');

picturesElement.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('picture__img')) {
    evt.preventDefault();
    const picture = evt.target.closest('.picture');
  }
});
