import template from './login.html';
import controller from './user.controller';
import './user.styl';

let userComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default userComponent;
