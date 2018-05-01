import AbstracktView from './abstract-view';

export default class ResultTimeExpiredView extends AbstracktView {
  get template() {
    return `<!-- Результат игры: проигрыш время вышло -->
    <section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  
      <h2 class="title">Увы и ах!</h2>
      <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>
      <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
    </section>`;
  }

  onClick() {
    throw new Error(`You need to create handler first!`);
  }

  bind() {
    const replayBtn = this.element.querySelector(`.main-replay`);
    replayBtn.addEventListener(`click`, this.onClick);
  }
}
