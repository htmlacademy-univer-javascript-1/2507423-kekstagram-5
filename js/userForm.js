const imageUploadForm = document.querySelector('#upload-select-image');
const imageUploadFile = document.querySelector('#upload-file');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const imageUploadCancel = document.querySelector('#upload-cancel');

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
