import template from './sidebar.html';
import controller from './sidebar.controller';
import './sidebar.styl';

let sidebarComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default sidebarComponent;
