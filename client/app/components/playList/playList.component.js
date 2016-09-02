import template from './playList.html';
import controller from './playList.controller';
import './playList.styl';

let playListComponent = {
  restrict: 'E',
  bindings: {
    playlist: '<'
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default playListComponent;
