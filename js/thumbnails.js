import { createPhotoGallery } from './data.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const picturesContainerElement = document.querySelector('.pictures');

const thumbnailsGallery = createPhotoGallery();

const picturesContainerFragment = document.createDocumentFragment();

thumbnailsGallery.forEach((thumbnail) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = thumbnail.url;
  pictureElement.querySelector('.picture__likes').textContent = thumbnail.likes;
  pictureElement.querySelector('.picture__comments').textContent = thumbnail.comments.length;
  picturesContainerElement.append(picturesContainerFragment);
});

picturesContainerElement.append(picturesContainerFragment);


