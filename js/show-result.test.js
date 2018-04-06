import {assert} from 'chai';
import showUserResult from './show-result';

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
