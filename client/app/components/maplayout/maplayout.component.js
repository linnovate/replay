import template from './maplayout.html';
import controller from './maplayout.controller';
import './maplayout.styl';

let maplayoutComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default maplayoutComponent;
