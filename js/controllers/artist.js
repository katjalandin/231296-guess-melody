import {onGetNextLevel} from '../main';
import ArtistView from '../views/artist-view';

export default (level, state) => {
  const {mistakes} = state.get();
  const artistView = new ArtistView(level, mistakes);

  artistView.onClick = (evt) => {
    const currentState = state.get();
    const userAnswer = evt.target.getAttribute(`alt`);
    const newAnswer = {
      userAnswer,
      isRight: level.track.artist === userAnswer,
      time: 20
    };

    state.set({
      userAnswers: [...currentState.userAnswers, newAnswer],
      mistakes: newAnswer.isRight ? currentState.mistakes : currentState.mistakes + 1
    });

    onGetNextLevel();
  };

  return artistView;
};

