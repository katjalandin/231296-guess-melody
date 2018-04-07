const TIME_LIMIT = 300;
export const LIFE_COUNT = 3;
export const MAX_ANSWERS = 10;
const getPoints = ({isCorrect, time}) => {
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
