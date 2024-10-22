function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

function createIdGenerator () {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId
  };
};

const generatePhotoId = createIdGenerator();

const generatePhotoUrl = `photos/${generatePhotoId}.jpg`;

const createPictureData = function () {
  return {
    id: generatePhotoId(),
    url: generatePhotoUrl,
    description: '',
    likes: NaN,
    comments: [],
  };
};

