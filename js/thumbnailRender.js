import { fetchData } from './server.js';
import { debounce } from './util.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainerElement = document.querySelector('.pictures');
const imgFiltersElement = document.querySelector('.img-filters');
const filterButtons = imgFiltersElement.querySelectorAll('.img-filters__button');

const FILTER_RANDOM_COUNT = 10;

const errorMessageElement = document.createElement('div');
errorMessageElement.classList.add('error-message');
errorMessageElement.textContent = 'Ошибка загрузки данных. Пожалуйста, попробуйте позже.';
document.body.appendChild(errorMessageElement);

let thumbnailsGallery = [];

function updateThumbnails(filter) {
  const pictures = document.querySelectorAll('.picture');
  const picturesContainer = document.querySelector('.pictures');

  let filteredThumbnails = [];

  switch (filter) {
    case 'filter-random':
      filteredThumbnails = [...thumbnailsGallery]
        .sort(() => Math.random() - 0.5)
        .slice(0, FILTER_RANDOM_COUNT);
      break;
    case 'filter-discussed':
      filteredThumbnails = [...thumbnailsGallery]
        .sort((a, b) => b.comments.length - a.comments.length);
      break;
    default:
      filteredThumbnails = thumbnailsGallery;
  }

  const existingIds = new Set(filteredThumbnails.map((thumbnail) => thumbnail.id));

  pictures.forEach((picture) => {
    const pictureId = Number(picture.dataset.id);
    if (!existingIds.has(pictureId)) {
      picture.remove();
    }
  });

  filteredThumbnails.forEach((thumbnail) => {
    if (!picturesContainer.querySelector(`[data-id='${thumbnail.id}']`)) {
      const pictureElement = pictureTemplate.cloneNode(true);

      pictureElement.dataset.id = thumbnail.id;
      pictureElement.querySelector('.picture__img').src = thumbnail.url;
      pictureElement.querySelector('.picture__likes').textContent = thumbnail.likes;
      pictureElement.querySelector('.picture__comments').textContent = thumbnail.comments.length;

      picturesContainer.appendChild(pictureElement);
    }
  });
}

const debouncedUpdateThumbnails = debounce(updateThumbnails, 500);

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

imgFiltersElement.addEventListener('click', (evt) => {
  // eslint-disable-next-line curly
  if (!evt.target.classList.contains('img-filters__button')) return;

  filterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
  evt.target.classList.add('img-filters__button--active');

  const filterId = evt.target.id;
  debouncedUpdateThumbnails(filterId);
});

renderThumbnails().then(() => {
  imgFiltersElement.classList.remove('img-filters--inactive');
});

export { thumbnailsGallery };

