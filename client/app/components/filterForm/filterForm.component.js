import template from './filterForm.html';
import controller from './filterForm.controller';
import './filterForm.styl';

let filterFormComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default filterFormComponent;
