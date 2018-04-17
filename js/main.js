import showScreen from './show-screen';
import getWelcomeScreen from './templates/welcome';
import getArtistScreen from './templates/artist';
import getResultScreen from './templates/result';
import getResultAttemptExpiredScreen from './templates/result-attempt-expired';
import getResultTimeExpired from './templates/result-time-expired';
import getGenreScreen from './templates/gente';
import state from './data/game-state';
import {getRandomLevels, GAME} from './data/game';

export const onGetNextLevel = () => {
  const {currentLevel, mistakes, levels} = state.get();

  if (mistakes === GAME.MISTAKES_COUNT) {
    showScreen(getResultAttemptExpiredScreen);
    return;
  }

  //TODO show result time expired
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

  showScreen(getResultScreen);
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
