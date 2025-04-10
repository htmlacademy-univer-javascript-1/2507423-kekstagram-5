import { createPhotoGallery } from './data.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const picturesContainer = document.querySelector('.pictures');

const thumbnailsGallery = createPhotoGallery();


thumbnailsGallery.forEach((thumbnail) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = thumbnail.url;
  pictureElement.querySelector('.picture__likes').textContent = thumbnail.likes;
  pictureElement.querySelector('.picture__comments').textContent = thumbnail.comments.length;
  picturesContainer.append(pictureElement);
});
