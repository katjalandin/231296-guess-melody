import showScreen from './show-screen';
import getWelcomeScreen from './templates/welcome';
import getArtistScreen from './templates/artist';
import getResultScreen from './templates/result';
import getResultAttemptExpiredScreen from './templates/result-attempt-expired';
// import getResultTimeExpired from './templates/result-time-expired';
import getGenreScreen from './templates/gente';
import state from './data/game-state';
import {getRandomLevels, GAME} from './data/game';

const _getResults = (mistakes) => {
  // console.log(userAnswers);
  return {
    min: 3,
    sec: 25,
    errorCount: mistakes,
    points: 12,
    fastPoints: 8,
    comparison: `Вы заняли 2 место из 10. Это&nbsp;лучше чем у&nbsp;80%&nbsp;игроков`
  };
};

export const onGetNextLevel = () => {
  const {currentLevel, mistakes, levels, userAnswers} = state.get();

  if (mistakes === GAME.MISTAKES_COUNT) {
    showScreen(getResultAttemptExpiredScreen(resultInfo));
    return;
  }

  // TODO show result time expired
  const level = currentLevel < GAME.TOTAL_QUESTIONS ? levels[currentLevel] : false;
  if (level) {
    state.set({currentLevel: currentLevel + 1});

    switch (level.type) {
      case GAME.TYPES.GENRE:
        showScreen(getGenreScreen(level, state));
        break;
      case GAME.TYPES.ARTIST:
        showScreen(getArtistScreen(level, state));
        break;
    }
    return;
  }

  const resultInfo = _getResults(mistakes, userAnswers);
  showScreen(getResultScreen(resultInfo));
};

export const initializeGame = () => {
  state.clear();
  state.set({
    levels: getRandomLevels()
  });
  showScreen(getWelcomeScreen(onGetNextLevel));
};


const onContentLoaded = () => {
  initializeGame();
};

document.addEventListener(`DOMContentLoaded`, onContentLoaded);
