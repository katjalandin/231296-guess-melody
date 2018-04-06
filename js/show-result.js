export default (total = res, result) => {
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
