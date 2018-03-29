(function () {
  const KEYS = {
    ALT: 18,
    LEFT: 37,
    RIGHT: 39
  };
  const template = document.getElementById(`templates`);
  const screens = template && template.content.querySelectorAll(`.main`);
  const main = document.querySelector(`.main`);
  let isAltPress = false;
  let currentScreen = 0;

  const getScreen = (i) => screens[i] || screens[currentScreen];
  const showScreen = (number) => {
    if (number > screens.length - 1 || number < 0) {
      return;
    }
    const screen = getScreen(number);
    main.innerHTML = screen.outerHTML;
    currentScreen = number;
  };

  const onKeyUpHandler = (evt) => {
    if (evt.keyCode === KEYS.ALT) {
      isAltPress = false;
    }
  };

  const onKeyDownHandler = (evt) => {
    switch (evt.keyCode) {
      case KEYS.ALT:
        isAltPress = true;
        break;
      case KEYS.RIGHT:
        if (isAltPress) {
          showScreen(currentScreen + 1);
        }
        break;
      case KEYS.LEFT:
        if (isAltPress) {
          showScreen(currentScreen - 1);
        }
        break;
    }
  };

  document.addEventListener(`keydown`, onKeyDownHandler);
  document.addEventListener(`keyup`, onKeyUpHandler);

  showScreen(currentScreen);
})();

