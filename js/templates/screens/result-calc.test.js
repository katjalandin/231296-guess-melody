import {assert} from 'chai';
import {times} from '../../utils';
import {
  calculateResult,
  showUserResult,
  MAX_ANSWERS,
  LIFE_COUNT
} from './result-calc';

const TEST_ANSWERS = {
  quick: {
    isCorrect: true,
    time: 10
  },
  correct: {
    isCorrect: true,
    time: 50
  },
  incorrect: {
    isCorrect: false,
    time: 10
  }
};

const STATISTICS = [
  {
    points: 25,
    remainNotes: 2,
    remainTimes: 22
  },
  {
    points: 14,
    remainNotes: 2,
    remainTimes: 22
  },
  {
    points: 1,
    remainNotes: 2,
    remainTimes: 22
  },
  {
    points: 4,
    remainNotes: 2,
    remainTimes: 22
  },
  {
    points: 6,
    remainNotes: 2,
    remainTimes: 22
  },
];

describe(`Result page`, () => {
  describe(`Calculate result`, () => {
    it(`Minimum correct answers is 10`, () => {
      assert.equal(calculateResult([TEST_ANSWERS.correct], 2), 0);
    });

    it(`if time up limit then 0`, () => {
      assert.equal(calculateResult(times(10, TEST_ANSWERS.correct), 2), 0);
    });

    it(`2 slow and 8 quick answer return 18`, () => {
      assert.equal(calculateResult([...times(2, TEST_ANSWERS.correct), ...times(8, TEST_ANSWERS.quick)], 2), 18);
    });

    it(`10 correct ans quick answers return 20 point`, () => {
      assert.equal(calculateResult(times(10, TEST_ANSWERS.quick), 2), 20);
    });

    it(`zero answers return 0 point`, () => {
      assert.equal(calculateResult([], 2), 0);
    });

    it(`if don't remain notes return 0`, () => {
      assert.equal(calculateResult(times(10, TEST_ANSWERS.correct), 0), 0);
    });

    it(`${LIFE_COUNT} incorrect and ${MAX_ANSWERS - LIFE_COUNT} quick answer return 14`, () => {
      assert.equal(calculateResult(
        [
          ...times(LIFE_COUNT, TEST_ANSWERS.incorrect),
          ...times(MAX_ANSWERS - LIFE_COUNT, TEST_ANSWERS.quick)
        ], 0), 11);
    });

    it(`${LIFE_COUNT} incorrect and ${MAX_ANSWERS - 1} quick answer return 0`, () => {
      assert.equal(calculateResult(
        [
          ...times(LIFE_COUNT, TEST_ANSWERS.incorrect),
          ...times(MAX_ANSWERS - LIFE_COUNT, TEST_ANSWERS.quick)
        ], 1), 0);
    });
  });

  describe(`Show result`, () => {
    it(`correct position and persentage info`, () => {
      assert.equal(showUserResult(STATISTICS, {
        points: 8,
        remainNotes: 2,
        remainTimes: 22
      }), `Вы заняли 3-ое место из 6. Это лучше чем у 50% игроков.`);

      assert.equal(showUserResult(STATISTICS, {
        points: 100,
        remainNotes: 2,
        remainTimes: 22
      }), `Вы заняли 1-ое место из 6. Это лучше чем у 83% игроков.`);

      assert.equal(showUserResult(STATISTICS, {
        points: 1,
        remainNotes: 2,
        remainTimes: 22
      }), `Вы заняли 6-ое место из 6. Это лучше чем у 0% игроков.`);
    });

    it(`get position and persentage if statistics are empty`, () => {
      assert.equal(showUserResult([], {
        points: 8,
        remainNotes: 2,
        remainTimes: 22
      }), `Вы заняли 1-ое место из 1. Это лучше чем у 0% игроков.`);
    });

    it(`if notes ended then you lose`, () => {
      assert.equal(showUserResult([], {
        points: 0,
        remainNotes: 0,
        remainTimes: 22
      }), `У вас закончились все попытки. Ничего, повезёт в следующий раз!`);
    });

    it(`if time ended then you lose`, () => {
      assert.equal(showUserResult([], {
        points: 0,
        remainNotes: 2,
        remainTimes: 0
      }), `Время вышло! Вы не успели отгадать все мелодии`);
    });
  });
});
