import {getElementFromTemplate} from '../utils';
import {onGetNextLevel} from '../main';
import getSvgMarkup from './svg';
import getMistakesMarkup from './mistakes';

const getAnswerMarkup = ({src}, number) => {
  return `<div class="genre-answer">
    <div class="player-wrapper">
      <div class="player">
        <audio src=${src}></audio>
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

export default (level, state) => {
  const template = `<!-- Игра на выбор жанра -->
  <section class="main main--level main--level-genre">
    ${getSvgMarkup()}
    ${getMistakesMarkup()}

    <div class="main-wrap">
      <h2 class="title">${level.question}</h2>
      <form class="genre">
        ${level.answers.map((answer, i) => getAnswerMarkup(answer.track, i))}
        <button class="genre-answer-send" type="submit" disabled="true">Ответить</button>
      </form>
    </div>
  </section>`;

  const genteScreen = getElementFromTemplate(template);


  const screen = genteScreen.cloneNode(true);
  const sendBtn = screen.querySelector(`.genre-answer-send`);
  const answers = screen.querySelectorAll(`input[name=answer]`);
  [...answers].forEach((answer) => {
    answer.addEventListener(`change`, (evt) => {
      const item = evt.target;
      const isAnswerExist = item.checked;
      [...answers].forEach((item) => item.checked = false);
      item.checked = isAnswerExist;
      if (isAnswerExist && sendBtn.getAttribute(`disabled`)) {
        sendBtn.removeAttribute(`disabled`);
      } else if (!isAnswerExist) {
        sendBtn.setAttribute(`disabled`, `true`);
      }
    });
  });

  sendBtn.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    const currentState = state.get();
    const selectedCheckbox = [...answers].find((answer) => answer.checked);
    const number = selectedCheckbox && selectedCheckbox.id.substr(selectedCheckbox.id.indexOf('-') + 1);
    const userAnswer = level.answers[number];
    const newAnswer = {
      userAnswer: userAnswer.track,
      isRight: userAnswer.isRight,
      time: 20
    };

    state.set({
      userAnswers: [...currentState.userAnswers, newAnswer],
      mistakes: newAnswer.isRight ? currentState.mistakes : currentState.mistakes + 1
    });

    onGetNextLevel();
  });

  return screen;
};

