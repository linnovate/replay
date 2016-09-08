import template from './viewport.html';
import controller from './playList.controller';
import './playList.styl';

let playListComponent = {
  restrict: 'E',
  bindings: {
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default playListComponent;
