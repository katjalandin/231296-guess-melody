import {getElementFromTemplate, getRandomArrayItem} from '../utils';
import showScreen from '../show-screen';
import resultDefault from './result';
import resultTimeExpired from './result-time-expired';
import resultAttemptExpired from './result-attempt-expired';
import getSvgMarkup from './svg';
import getMistakesMarkup from './mistakes';

const screenTypes = [
  resultDefault,
  resultTimeExpired,
  resultAttemptExpired
];

const getAnswerMarkup = ({number}) => {
  return `<div class="genre-answer">
    <div class="player-wrapper">
      <div class="player">
        <audio></audio>
        <button class="player-control player-control--pause"></button>
        <div class="player-track">
          <span class="player-status"></span>
        </div>
      </div>
    </div>
    <input type="checkbox" name="answer" value="answer-${number}" id="a-${number}">
    <label class="genre-answer-check" for="a-${number}"></label>
  </div>`
};

export default (level) => {
  const template = `<!-- Игра на выбор жанра -->
  <section class="main main--level main--level-genre">
    ${getSvgMarkup()}
    ${getMistakesMarkup()}

    <div class="main-wrap">
      <h2 class="title">${level.question}</h2>
      <form class="genre">
        ${level.answers.map(answer => getAnswerMarkup(answer))}
        <button class="genre-answer-send" type="submit" disabled="true">Ответить</button>
      </form>
    </div>
  </section>`;

  const genteScreen = getElementFromTemplate(template);


  const screen = genteScreen.cloneNode(true);
  const sendBtn = screen.querySelector(`.genre-answer-send`);
  const answers = screen.querySelectorAll(`input[name=answer]`);
  [...answers].forEach((answer) => {
    answer.addEventListener(`change`, () => {
      const isAnswerExist = [...answers].some((item) => item.checked);
      if (isAnswerExist && sendBtn.getAttribute(`disabled`)) {
        sendBtn.removeAttribute(`disabled`);
      } else if (!isAnswerExist && !sendBtn.getAttribute(`disabled`)) {
        sendBtn.setAttribute(`disabled`, `true`);
      }
    });
  });

  sendBtn.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    showScreen(getRandomArrayItem(screenTypes)());
  });

  return screen;
};

