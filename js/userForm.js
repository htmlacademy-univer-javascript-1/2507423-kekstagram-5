const imageUploadForm = document.querySelector('#upload-select-image');
const imageUploadFile = document.querySelector('#upload-file');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');

imageUploadFile.addEventListener('change', () => {
  imageUploadForm.classList.remove('hidden');
  imageUploadOverlay.classList.remove('hidden');
});

