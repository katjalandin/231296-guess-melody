import {getElementFromTemplate} from '../utils';
import showScreen from '../show-screen';
import getGenteScreen from './gente';
import getSvgMarkup from './svg';
import getMistakesMarkup from './mistakes';

const getPlayerMarkup = () => {
  return `<div class="player-wrapper">
    <div class="player">
      <audio></audio>
      <button class="player-control player-control--pause"></button>
      <div class="player-track">
        <span class="player-status"></span>
      </div>
    </div>
  </div>`
};

const getAnswerMarkup = ({number, image, artist}) => {
  return `<div class="main-answer-wrapper">
    <input class="main-answer-r" type="radio" id="answer-${number}" name="answer" value="val-${number}"/>
    <label class="main-answer" for="answer-${number}">
      <img class="main-answer-preview" src="${image}"
           alt="${artist}" width="134" height="134">
      ${artist}
    </label>
  </div>`
};

export default (level) => {
  console.log('artist');
  const template = `<section class="main main--level main--level-artist">
    ${getSvgMarkup()}
    ${getMistakesMarkup()}
    <div class="main-wrap">
      <h2 class="title main-title">Кто исполняет эту песню?</h2>
      ${getPlayerMarkup()}
      <form class="main-list">
        ${level.answers.map(answer => getAnswerMarkup(answer))}
      </form>
    </div>
  </section>`;

  const artistScreen = getElementFromTemplate(template);

  const screen = artistScreen.cloneNode(true);

  const answers = screen.querySelectorAll(`.main-answer`);
  [...answers].forEach((answer) => {
    answer.addEventListener(`click`, () => showScreen(getGenteScreen({
      question: `Выберите инди-рок треки`,
      answers: [{
        number: 1
      }, {
        number: 2
      }, {
        number: 3
      }, {
        number: 4
      }]
    })));
  });

  return screen;
};

