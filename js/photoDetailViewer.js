/* eslint-disable curly */
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

let photoData = null;

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

const COMMENTS_STEP = 5;

let displayedComments = 0;

picturesElement.addEventListener('click', (evt) => {
  const image = evt.target;
  if (!image.classList.contains('picture__img')) return;
  evt.preventDefault();

  const picture = image.closest('.picture');
  const pictureId = Number(picture.dataset.id);

  const foundPhoto = thumbnailsGallery.find((thumbnail) => thumbnail.id === pictureId);
  if (!foundPhoto) return;

  photoData = foundPhoto;

  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureImage.src = photoData.url;
  bigPictureDescription.textContent = photoData.description;
  bigPictureLikes.textContent = photoData.likes;
  bigPictureCommentsCount.textContent = photoData.comments.length;

  displayedComments = 0;
  bigPictureCommentsList.innerHTML = '';

  renderNextComments();

  bigPictureCommentsLoader.classList.toggle('hidden', displayedComments >= photoData.comments.length);
});

function renderNextComments() {
  const remaining = photoData.comments.slice(displayedComments, displayedComments + COMMENTS_STEP);

  remaining.forEach((comment) => {
    bigPictureCommentsList.appendChild(createCommentElement(comment));
  });

  displayedComments += remaining.length;

  bigPictureShowedCommentsCount.textContent = `${displayedComments} из ${photoData.comments.length} комментариев`;

  if (displayedComments >= photoData.comments.length) {
    bigPictureCommentsLoader.classList.add('hidden');
  }
}

bigPictureCommentsLoader.addEventListener('click', (evt) => {
  evt.preventDefault();
  renderNextComments();
});

function closeBigPicture() {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

closeButtonElement.addEventListener('click', () => {
  closeBigPicture();
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
});
