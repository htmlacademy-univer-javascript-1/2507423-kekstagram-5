import { fetchData } from './server.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainerElement = document.querySelector('.pictures');

const errorMessageElement = document.createElement('div');
errorMessageElement.classList.add('error-message');
errorMessageElement.textContent = 'Ошибка загрузки данных. Пожалуйста, попробуйте позже.';
document.body.appendChild(errorMessageElement);

let thumbnailsGallery = [];

const renderThumbnails = async () => {
  try {
    thumbnailsGallery = await fetchData();
    const picturesContainerFragment = document.createDocumentFragment();

    thumbnailsGallery.forEach((thumbnail) => {
      const pictureElement = pictureTemplate.cloneNode(true);

      pictureElement.dataset.id = thumbnail.id;
      pictureElement.querySelector('.picture__img').src = thumbnail.url;
      pictureElement.querySelector('.picture__likes').textContent = thumbnail.likes;
      pictureElement.querySelector('.picture__comments').textContent = thumbnail.comments.length;

      picturesContainerFragment.appendChild(pictureElement);
    });

    picturesContainerElement.appendChild(picturesContainerFragment);

    errorMessageElement.style.display = 'none';
  } catch (error) {
    errorMessageElement.style.display = 'block';
  }
};

renderThumbnails();

export { thumbnailsGallery };

