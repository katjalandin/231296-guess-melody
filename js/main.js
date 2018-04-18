import showScreen from './show-screen';
import getWelcomeScreen from './templates/welcome';
import getArtistScreen from './templates/artist';
import getResultScreen from './templates/result';
import getResultAttemptExpiredScreen from './templates/result-attempt-expired';
// import getResultTimeExpired from './templates/result-time-expired';
import getGenreScreen from './templates/gente';
import state from './data/game-state';
import {getRandomLevels, GAME} from './data/game';
import {getResults, getComparison} from './show-result';
export const statistics = [];

export const onGetNextLevel = () => {
  const {currentLevel, levels, userAnswers} = state.get();
  const userResult = getResults(userAnswers, statistics);

  if (userResult.mistakes === GAME.MISTAKES_COUNT) {
    showScreen(getResultAttemptExpiredScreen());
    initializeGame();
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

  const userStatistic = _getUserStatistics(userResult);
  const resultData = { ...userResult, comparison: getComparison(statistics, userStatistic)};
  statistics.push(userStatistic);
  showScreen(getResultScreen(resultData));
  initializeGame();
};

const _getUserStatistics = ({time, scores, mistakes}) => {
  const userStatistic = {
    scores,
    remainNotes: GAME.MISTAKES_COUNT - mistakes,
    remainTimes: GAME.TOTAL_TIME - time
  };

  return userStatistic;
};

export const initializeGame = () => {
  state.clear();
  state.set({
    levels: getRandomLevels()
  });
};


const onContentLoaded = () => {
  initializeGame();
  showScreen(getWelcomeScreen(onGetNextLevel));
};

document.addEventListener(`DOMContentLoaded`, onContentLoaded);
