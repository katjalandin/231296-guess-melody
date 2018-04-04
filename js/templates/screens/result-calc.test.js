import {assert} from 'chai';
import {times} from '../../utils';
import {calculateResult, showUserResult} from './result-calc';

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
  });

  // describe(`Show result`, () => {
  //   it(`Correct answer return 1 point`, () => {
  //     assert.equal(showUserResult([], ), `Время вышло! Вы не успели отгадать все мелодии`);
  //   });


  // });
});
