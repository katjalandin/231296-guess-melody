(function () {
  const KEYS = {
    LEFT: 37,
    RIGHT: 39
  };
  const template = document.getElementById(`templates`);
  const screens = template && template.content.querySelectorAll(`.main`);
  const main = document.querySelector(`.main`);
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
    if (evt.keyCode === KEYS.RIGHT && event.altKey) {
      showScreen(currentScreen + 1);
    }

    if (evt.keyCode === KEYS.LEFT && event.altKey) {
      showScreen(currentScreen - 1);
    }
  };

  document.addEventListener(`keyup`, onKeyUpHandler);

  showScreen(currentScreen);
})();

