import { createPhotoGallery } from './data.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const picturesContainer = document.querySelector('.pictures');

const thumbnailsGallery = createPhotoGallery();

thumbnailsGallery.forEach(() => {
  const pictureElement = pictureTemplate.cloneNode(true);
  picturesContainer.append(pictureElement);
});
