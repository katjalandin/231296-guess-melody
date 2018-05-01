import AbstracktView from './abstract-view';
import getSvgMarkup from '../controllers/svg';
import getMistakesMarkup from '../controllers/mistakes';

export default class GenreView extends AbstracktView {
  constructor(level, mistakes) {
    super();
    this._mistakes = mistakes;
    this._level = level;
  }

  get template() {
    return `<section class="main main--level main--level-genre">
        ${getSvgMarkup()}
        ${getMistakesMarkup(this._mistakes).template}
    
        <div class="main-wrap">
          <h2 class="title">${this._level.question}</h2>
          <form class="genre">
            ${this._level.answers.map((answer, i) => this._getAnswerMarkup(answer.track, i))}
            <button class="genre-answer-send" type="submit" disabled="true">Ответить</button>
          </form>
        </div>
      </section>`;
  }

  _getAnswerMarkup({src}, number) {
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
  </div>`;
  }

  checkUserAnswersRight(levelAnswers, userAnswers) {

    return [...levelAnswers].every((levelAnswer) => {
      const answer = userAnswers.find((item) => item.track.src === levelAnswer.track.src && item.track.artist === levelAnswer.track.artist) || {isRight: false};
      return levelAnswer.isRight === answer.isRight || !levelAnswer.isRight === !answer.checked;
    });
  }

  getUserAnswers() {

    return [...this._answers].filter((input) => input.checked === true).map((item) => {
      const number = item.id.substr(item.id.indexOf(`-`) + 1);

      return this._level.answers[number];
    });
  }

  onClick() {
    throw new Error(`You need to create handler first!`);
  }

  _onAnswerChange(answers, sendBtn) {
    const answersExist = [...answers].some((input) => input.checked === true);

    if (answersExist && sendBtn.getAttribute(`disabled`)) {
      sendBtn.removeAttribute(`disabled`);
    } else if (!answersExist) {
      sendBtn.setAttribute(`disabled`, `true`);
    }
  }

  bind() {
    const sendBtn = this.element.querySelector(`.genre-answer-send`);
    const answers = this.element.querySelectorAll(`input[name=answer]`);
    this._answers = answers;

    [...answers].forEach((answer) => {
      answer.addEventListener(`change`, () => this._onAnswerChange(answers, sendBtn));
    });

    sendBtn.addEventListener(`click`, this.onClick);
  }
}
