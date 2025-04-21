const imagePreview = document.querySelector('.img-upload__preview img');

const imageUploadForm = document.querySelector('#upload-select-image');
const imageUploadFile = document.querySelector('#upload-file');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const imageUploadCancel = document.querySelector('#upload-cancel');

const imageDescription = imageUploadForm.querySelector('.text__description');
const imageHashtagField = imageUploadForm.querySelector('.text__hashtags');

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
function openUploadForm() {
  imageUploadForm.classList.remove('hidden');
  imageUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

function closeUploadForm() {
  imageUploadOverlay.classList.add('hidden');
  imageUploadFile.value = '';
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentEscapeKeydown);
}

function onDocumentEscapeKeydown(evt) {
  if (evt.key === 'Escape') {
    closeUploadForm();
  }
}

imageUploadFile.addEventListener('change', () => {
  openUploadForm();

  document.addEventListener('keydown', onDocumentEscapeKeydown);
});

imageUploadCancel.addEventListener('click', () => {
  closeUploadForm();
});

imageDescription.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

imageHashtagField.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

pristine.addValidator(
  imageDescription,
  (value) => value.length <= 140,
  'Описание должно быть не более 140 символов'
);

const validateHashtagAmount = (value) => value.trim().split(/\s+/).length <= 5;

function validateHashtagUniqueness() {
  const hashtags = imageHashtagField.value.trim().split(/\s+/);
  const lowerCaseHashtags = [];
  for (let i = 0; i < hashtags.length; i++) {
    const tag = hashtags[i];
    const lowerCaseTag = tag.toLowerCase();
    if (lowerCaseHashtags.includes(lowerCaseTag)) {
      return false;
    }
    lowerCaseHashtags.push(lowerCaseTag);
  }
  return true;
}

function validateHashtags(value) {
  if (!value.trim()) {
    return true;
  }

  const hashtags = value.trim().split(/\s+/);
  const hashtagRegex = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

  for (let i = 0; i < hashtags.length; i++) {
    const tag = hashtags[i];
    if (!hashtagRegex.test(tag)) {
      return false;
    }
  }

  return true;
}

pristine.addValidator(
  imageHashtagField,
  validateHashtagAmount,
  'Нельзя указать больше пяти хэш-тегов'
);

pristine.addValidator(
  imageHashtagField,
  validateHashtagUniqueness,
  'Хэш-теги не должны повторяться'
);


pristine.addValidator(
  imageHashtagField,
  validateHashtags,
  'Хэш-тег должен начинаться с # и содержать буквы и цифры (не более 20 символов, включая #)'
);

imageUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    closeUploadForm();
  }
});

let currentScale = 100;
function updateScale(newScale) {
  currentScale = Math.min(100, Math.max(25, newScale));
  scaleControlValue.value = `${currentScale}%`;
  imagePreview.style.transform = `scale(${currentScale / 100})`;
}

scaleControlSmaller.addEventListener('click', () => {
  updateScale(currentScale - 25);
});

scaleControlBigger.addEventListener('click', () => {
  updateScale(currentScale + 25);
});

updateScale(100);
