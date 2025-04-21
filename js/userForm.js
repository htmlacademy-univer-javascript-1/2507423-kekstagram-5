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

const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');
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
  resetFilters();
  openUploadForm();

  document.addEventListener('keydown', onDocumentEscapeKeydown);
});

imageUploadCancel.addEventListener('click', () => {
  closeUploadForm();
  resetForm();
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

imageUploadForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    try {
      const formData = new FormData(imageUploadForm);
      const response = await fetch(imageUploadForm.action, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        closeUploadForm();
        resetForm();
        showMessage('success', 'success__button');
      } else {
        showMessage('error', 'error__button');
      }
    } catch {
      showMessage('error', 'error__button');
    }
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

const EFFECTS = {
  'chrome': { filter: 'grayscale', unit: '', range: { min: 0, max: 1 }, step: 0.1 },
  'sepia': { filter: 'sepia', unit: '', range: { min: 0, max: 1 }, step: 0.1 },
  'marvin': { filter: 'invert', unit: '%', range: { min: 0, max: 100 }, step: 1 },
  'phobos': { filter: 'blur', unit: 'px', range: { min: 0, max: 3 }, step: 0.1 },
  'heat': { filter: 'brightness', unit: '', range: { min: 1, max: 3 }, step: 0.1 },
  'none': null,
};

let currentEffect = 'none';

noUiSlider.create(effectLevelSlider, {
  start: 100,
  range: { min: 0, max: 100 },
  step: 1,
  connect: 'lower',
});

function updateEffect(value) {
  if (currentEffect === 'none') {
    imagePreview.style.filter = '';
    return;
  }

  const effect = EFFECTS[currentEffect];
  let filterValue;

  if (currentEffect === 'marvin') {
    filterValue = value;
  } else {
    filterValue = value * (effect.range.max - effect.range.min) + effect.range.min;
  }

  imagePreview.style.filter = `${effect.filter}(${filterValue}${effect.unit})`;
  effectLevelValue.value = filterValue.toFixed(2);
}

effectsList.addEventListener('change', (evt) => {
  if (evt.target.name === 'effect') {
    currentEffect = evt.target.value;

    if (currentEffect === 'none') {
      effectLevelContainer.classList.add('hidden');
      imagePreview.style.filter = '';
      effectLevelValue.value = '';
    } else {
      const effect = EFFECTS[currentEffect];
      effectLevelContainer.classList.remove('hidden');
      effectLevelSlider.noUiSlider.updateOptions({
        range: effect.range,
        start: effect.range.max,
        step: effect.step,
      });
      updateEffect(effect.range.max);
    }
  }
});

function resetFilters() {
  currentEffect = 'none';
  effectLevelContainer.classList.add('hidden');
  imagePreview.style.filter = '';
  effectLevelValue.value = '';
  effectLevelSlider.noUiSlider.updateOptions({
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
  });

  const defaultEffectRadio = effectsList.querySelector('input[value="none"]');
  if (defaultEffectRadio) {
    defaultEffectRadio.checked = true;
  }
}

effectLevelSlider.noUiSlider.on('update', (values) => {
  updateEffect(parseFloat(values[0]));
});

effectLevelContainer.classList.add('hidden');
effectLevelValue.value = '';

function resetForm() {
  updateScale(100);
  resetFilters();
  imageDescription.value = '';
  imageHashtagField.value = '';
  imageUploadFile.value = '';
}

function showMessage(templateId, buttonClass) {
  const template = document.querySelector(`#${templateId}`).content.cloneNode(true);
  const messageElement = template.querySelector(`.${templateId}`);
  document.body.appendChild(messageElement);

  function closeMessage() {
    messageElement.remove();
    document.removeEventListener('keydown', onEscapeKeydown);
    document.removeEventListener('click', onOutsideClick);
  }

  function onEscapeKeydown(evt) {
    if (evt.key === 'Escape') {
      closeMessage();
    }
  }

  function onOutsideClick(evt) {
    if (!messageElement.contains(evt.target)) {
      closeMessage();
    }
  }

  messageElement.querySelector(`.${buttonClass}`).addEventListener('click', closeMessage);
  document.addEventListener('keydown', onEscapeKeydown);
  document.addEventListener('click', onOutsideClick);
}
