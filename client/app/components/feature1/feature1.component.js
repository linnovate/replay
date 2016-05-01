import template from './feature1.html';
import controller from './feature1.controller';
import './feature1.styl';

let feature1Component = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default feature1Component;
