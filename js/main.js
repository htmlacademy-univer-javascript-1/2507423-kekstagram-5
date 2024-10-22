const PHOTO_COUNT = 25;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;
const PHOTO_COMMENTS_COUNT = 30;
const AVATAR_COUNT = 6;
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const MAX_COMMENTS_COUNT = PHOTO_COMMENTS_COUNT * PHOTO_COUNT;

const DESCRIPTIONS = [
  'Летний закат на пляже 🌅',
  'Лучшие моменты на прогулке в парке 🌳',
  'Сочное авокадо на завтрак 🥑',
  'Невероятная гора на фоне облаков 🏞',
  'Утро в любимом кафе ☕️',
  'Цветущие поля весной 🌸',
  'Городские огни в ночи 🌃',
  'Тёплый плед и чашка чая 🍵',
  'Моя собака наслаждается солнечным днем 🐕',
  'Незабываемые горные тропы 🏔',
  'Закуски для пикника на природе 🧺',
  'Крутой велосипедный маршрут 🚴',
  'Чашка ароматного кофе перед работой ☕️',
  'Тихий вечер у камина 🔥',
  'Город просыпается вместе со мной 🌇',
  'Осенние листья под ногами 🍂',
  'Маленькое чудо в доме — мой кот 🐱',
  'Свадебный день — лучшие воспоминания 💍',
  'Зимняя сказка в лесу ❄️',
  'Долгожданная встреча с друзьями 👯‍♂️',
  'Закат на крыше небоскреба 🌆',
  'Романтический ужин на двоих 🍽',
  'Новая книга — время для чтения 📖',
  'Семейный вечер за настольными играми 🎲',

];

function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return Math.floor(Math.random() * (upper - lower + 1) + lower);
}

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      console.error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

function createIdGenerator () {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

const generatePhotoId = createIdGenerator()();

const generatePhotoUrl = `photos/${generatePhotoId}.jpg`;

const generateCommentId = createRandomIdFromRangeGenerator(1, MAX_COMMENTS_COUNT);

const createComment = function () {
  return {
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  };
};

const createPictureData = function (index) {
  return {
    id: generatePhotoId,
    url: generatePhotoUrl,
    description: DESCRIPTIONS[index],
    likes: getRandomInteger(15, 200),
    comments: [],
  };
};

