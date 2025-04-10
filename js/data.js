import { getRandomInteger, createRandomIdFromRangeGenerator, createIdGenerator} from './util.js';
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

const NAMES = ['Алексей', 'Мария', 'Дмитрий', 'Ольга', 'Николай', 'Екатерина', 'Иван', 'Анна', 'Сергей', 'Татьяна'];

const generatePhotoId = createRandomIdFromRangeGenerator(1, PHOTO_COUNT);
const generateCommentId = createRandomIdFromRangeGenerator(1, MAX_COMMENTS_COUNT);
const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
  name: NAMES[getRandomInteger(0, NAMES.length - 1)]
});
const createPicture = function () {
  const photoId = generatePhotoId();
  const photoDescription = DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)];
  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: photoDescription,
    likes: getRandomInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
    comments: Array.from({length: getRandomInteger(0, PHOTO_COMMENTS_COUNT)}, createComment),
  };
};

const createPhotoGallery = () => Array.from({length: PHOTO_COUNT}, createPicture);

export {createPhotoGallery};
