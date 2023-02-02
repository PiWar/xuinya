const isFileType = (file, type) => {
  return file && file['type'].split('/')[0] === type;
};

export const isFile = {
  image: file => isFileType(file, 'image'),
  video: file => isFileType(file, 'video'),
};

export const toBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

const startMention = /<span .+>@<\/span>/g;
const endMention = `</span>?</span>`;
const startNewMention = `<span class="mentioned">`;
const endNewMention = `</span>`;

export const formatMention = text => {
  console.log(text);
  return text
    .replaceAll(startMention, startNewMention)
    .replaceAll(endMention, endNewMention);
};
