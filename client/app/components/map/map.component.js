import template from './map.html';
import controller from './map.controller';
import './map.styl';

let mapComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default mapComponent;
