const { create, get } = require('browser-sync');


function getRandomInteger (min, max) = {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;

  return result;
};

const generatePhotoDescription = function () {
  return {
    id: generatePhotoId(),
    url: '',
    description: '',
    likes: NaN,
    comments: [],
  };
};
