import WelcomeView from '../views/welcome-view';

export default (callback) => {
  const welcomeView = new WelcomeView();

  welcomeView.onPlayClick = callback;

  return welcomeView;
};
