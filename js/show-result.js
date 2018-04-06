const TIME_LIMIT = 300;
export const LIFE_COUNT = 3;
export const MAX_ANSWERS = 10;
const getPoints = ({ isCorrect, time }) => {
  if (!isCorrect) {
    return -2;
  } else if (time < 30) {
    return 2;
  }

  return 1;
};

export const calculateResult = (answers, remainNotes = 0) => {
  if (!Array.isArray(answers) || answers.length !== MAX_ANSWERS || remainNotes === 0) {
    return -1;
  }

  const totalTime = answers.reduce((res, answer) => {

    return res + answer.time;
  }, 0);

  if (totalTime > TIME_LIMIT) {
    return -1;
  }



  return (answers || []).reduce((res, answer) => res + getPoints(answer), 0);
};

export const showUserResult = (total = res, result) => {
  const userResult = Object.assign({}, result, {currentUser: true});
  const all = [...total, userResult].sort((a, b) => a.points < b.points);
  const pos = all.findIndex(item => item.currentUser) + 1;
  const persent = Math.round(((all.length - pos) / all.length) * 100);

  if (result.points > 0) {
    return `Вы заняли ${pos}-ое место из ${all.length}. Это лучше чем у ${persent}% игроков.`;
  } else if (result.remainTimes === 0) {
    return `Время вышло! Вы не успели отгадать все мелодии`;
  }

  return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`
};