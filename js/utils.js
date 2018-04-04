export const getElementFromTemplate = (str) => {
  const element = document.createElement(`div`);
  element.innerHTML = str;

  const fragment = [...element.children].reduce((res, child) => {
    res.appendChild(child);

    return res;
  }, document.createDocumentFragment());

  return fragment;
};

export const getRandomArrayItem = (arr) => {
  const length = arr.length - 1;

  return arr[Math.trunc(Math.random() * length)];
};

export const times = (n, obj) => {
  const result = [];
  for(let i = 0; i < n; i++) {
    result[i] = Object.assign({}, obj);
  }

  return result;
};
