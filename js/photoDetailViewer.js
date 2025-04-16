import { thumbnailsGallery } from './thumbnailRender.js';

const picturesElement = document.querySelector('.pictures');
const bigPictureElement = document.querySelector('.big-picture');
const closeButtonElement = document.querySelector('.big-picture__cancel');

const bigPictureImage = bigPictureElement.querySelector('.big-picture__img img');
const bigPictureDescription = bigPictureElement.querySelector('.social__caption');
const bigPictureLikes = bigPictureElement.querySelector('.likes-count');
const bigPictureCommentsCount = bigPictureElement.querySelector('.comments-count');
const bigPictureCommentsList = bigPictureElement.querySelector('.social__comments');
const bigPictureShowedCommentsCount = bigPictureElement.querySelector('.social__comment-count');
const bigPictureCommentsLoader = bigPictureElement.querySelector('.comments-loader');

let currentPhotoComments = [];
let currentCommentsIndex = 0;

function createCommentElement(comment) {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');
  commentElement.innerHTML = `
    <img
      class="social__picture"
      src="${comment.avatar}"
      alt="${comment.name}"
      width="35" height="35">
    <p class="social__text">${comment.message}</p>`;
  return commentElement;
}

function renderNextComments() {
  const nextComments = currentPhotoComments.slice(currentCommentsIndex, currentCommentsIndex + 5);
  nextComments.forEach((comment) => {
    bigPictureCommentsList.appendChild(createCommentElement(comment));
  });

  currentCommentsIndex += nextComments.length;

  bigPictureShowedCommentsCount.textContent = `${currentCommentsIndex} из ${currentPhotoComments.length} комментариев`;

  if (currentCommentsIndex >= currentPhotoComments.length) {
    bigPictureCommentsLoader.classList.add('hidden');
  }
}

picturesElement.addEventListener('click', (evt) => {
  const image = evt.target;
  // eslint-disable-next-line curly
  if (!image.classList.contains('picture__img')) return;

  evt.preventDefault();

  const picture = image.closest('.picture');
  const pictureId = Number(picture.dataset.id);

  const photoData = thumbnailsGallery.find((item) => item.id === pictureId);

  // eslint-disable-next-line curly
  if (!photoData) return;

  bigPictureElement.classList.remove('hidden');
  bigPictureImage.src = photoData.url;
  bigPictureDescription.textContent = photoData.description;
  bigPictureLikes.textContent = photoData.likes;
  bigPictureCommentsCount.textContent = photoData.comments.length;

  // Очистим и сбросим переменные
  bigPictureCommentsList.innerHTML = '';
  currentPhotoComments = photoData.comments;
  currentCommentsIndex = 0;

  if (currentPhotoComments.length > 0) {
    bigPictureCommentsLoader.classList.remove('hidden');
  } else {
    bigPictureCommentsLoader.classList.add('hidden');
  }

  renderNextComments();

  document.body.classList.add('modal-open');
});

bigPictureCommentsLoader.addEventListener('click', (evt) => {
  evt.preventDefault();
  renderNextComments();
});

function closeBigPicture() {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  currentPhotoComments = [];
  currentCommentsIndex = 0;
  bigPictureCommentsList.innerHTML = '';
}

closeButtonElement.addEventListener('click', () => {
  closeBigPicture();
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
});
