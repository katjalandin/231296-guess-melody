import {getElementFromTemplate} from '../../utils';
import showScreen from '../../show-screen';
import getArtistScreen from './artist';

const template = `<!-- Приветствие -->
  <section class="main main--welcome">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
      Ошибиться можно 3 раза.<br>
      Удачи!
    </p>
  </section>`;

const welcomeScreen = getElementFromTemplate(template);

export default () => {
  const screen = welcomeScreen.cloneNode(true);

  const playBtn = screen.querySelector(`.main-play`);
  playBtn.addEventListener(`click`, () => showScreen(getArtistScreen()));

  return screen;
};
