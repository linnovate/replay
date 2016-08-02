import template from './userLoginPage.html';
import controller from './userLoginPage.controller';
import './userLoginPage.styl';

let userLoginPageComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default userLoginPageComponent;
