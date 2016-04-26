import template from './search.html';
import controller from './search.controller';
import './search.styl';

let searchComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default searchComponent;
