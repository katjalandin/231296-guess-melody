import {getElementFromTemplate} from '../utils';
import showScreen from '../show-screen';
import getWelcomeScreen from './welcome';

const data = {
  min: 3,
  sec: 25,
  errorCount: 3,
  points: 12,
  fastPoints: 8,
  comparison: `Вы заняли 2 место из 10. Это&nbsp;лучше чем у&nbsp;80%&nbsp;игроков`
};

export default ({min, sec, errorCount, comparison, points, fastPoints} = data) => {
  const template = `<!-- Результат игры: выигрыш -->
    <section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  
      <h2 class="title">Вы настоящий меломан!</h2>
      <div class="main-stat">За&nbsp;${min}&nbsp;минуты и ${sec}&nbsp;секунд
        <br>вы&nbsp;набрали ${points} баллов (${fastPoints} быстрых)
        <br>совершив ${errorCount} ошибки</div>
      <span class="main-comparison">${comparison}</span>
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    </section>`;
  const screen = getElementFromTemplate(template);
  const replayBtn = screen.querySelector(`.main-replay`);
  replayBtn.addEventListener(`click`, () => showScreen(getWelcomeScreen()));

  return screen;
};
