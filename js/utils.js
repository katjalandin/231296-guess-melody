export const getElementFromTemplate = (str) => {
  const element = document.createElement(`div`);
  element.innerHTML = str;

  const fragment = [...element.children].reduce((res, child) => {
    res.appendChild(child);

    return res;
  }, document.createDocumentFragment());

  return fragment;
};
