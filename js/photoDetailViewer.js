import { thumbnailsGallery } from './thumbnailRender.js';

const picturesElement = document.querySelector('.pictures');
const bigPictureElement = document.querySelector('.big-picture');
const closeButtonElement = document.querySelector('.big-picture__cancel');

const bigPictureImage = bigPictureElement.querySelector('.big-picture__img img');
const bigPictureDescription = bigPictureElement.querySelector('.social__caption');
const bigPictureLikes = bigPictureElement.querySelector('.likes-count');
const bigPictureCommentsCount = bigPictureElement.querySelector('.comments-count');
const bigPictureCommentsList = bigPictureElement.querySelector('.social__comments');


picturesElement.addEventListener('click', (evt) => {
  const image = evt.target;

  // eslint-disable-next-line curly
  if (!image.classList.contains('picture__img')) return;

  evt.preventDefault();

  const picture = image.closest('.picture');
  const pictureId = Number(picture.dataset.id);

  let photoData = null;
  for (let i = 0; i < thumbnailsGallery.length; i++) {
    if (thumbnailsGallery[i].id === pictureId) {
      photoData = thumbnailsGallery[i];
      break;
    }
  }

  bigPictureElement.classList.remove('hidden');
  bigPictureImage.src = photoData.url;
  bigPictureDescription.textContent = photoData.description;
  bigPictureLikes.textContent = photoData.likes;
  bigPictureCommentsCount.textContent = photoData.comments.length;

  bigPictureCommentsList.innerHTML = '';

  photoData.comments.forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    commentElement.innerHTML = `
      <img
        class="social__picture"
        src="${comment.avatar}"
        alt="${comment.name}"
        width="35" height="35">
      <p class="social__text">${comment.message}</p>
    `;
    bigPictureCommentsList.appendChild(commentElement);
  });

  document.body.classList.add('modal-open');
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
