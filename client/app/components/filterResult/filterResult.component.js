import template from './filterResult.html';
import controller from './filterResult.controller';
import './filterResult.styl';

let filterResultComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default filterResultComponent;
