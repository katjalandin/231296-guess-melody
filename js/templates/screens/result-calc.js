const TIME_LIMIT = 300;
const getPoints = ({ isCorrect, time }) => {
  if (!isCorrect) {
    return -1;
  } else if (time < 30) {
    return 2;
  }

  return 1;
};

const res = {
  userId: 1,
  points: 14,
  remainNotes: 2,
  remainTimes: 22
};

export const calculateResult = (answers, remainNotes = 0) => {
  if (!remainNotes) {
    return 0;
  }

  const {correctCount, totalTime} = answers.reduce((res, answer) => {
    res.correctCount += +answer.isCorrect;
    res.totalTime += answer.time;

    return res;
  }, {correctCount: 0, totalTime: 0});

  if (correctCount < 10 || totalTime > TIME_LIMIT) {
    return 0;
  }

  return (answers || []).reduce((res, answer) => res + getPoints(answer), 0);
};

export const showUserResult = (total, result) => {
  const userResult = {result, currentUser: true};
  const all = [...results, userResult].sort((a, b) => a.points > b.points);
  const pos = all.findIndex(item => item.currentUser) + 1;
  const persent = Math.round((pos / all.length) * 100);
};
