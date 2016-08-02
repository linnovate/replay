import template from './filterSelectbox.html';
import controller from './filterSelectbox.controller';
import './filterSelectbox.styl';

let filterSelectboxComponent = {
  restrict: 'E',
  bindings: {
    controlType: '@',
    label: '@',
    labelIcon: '@',
    onChange: '&',
    onRemove: '&'
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default filterSelectboxComponent;
