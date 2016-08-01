import template from './filterGraphicButton.html';
import controller from './filterGraphicButton.controller';
import './filterGraphicButton.styl';

let filterGraphicButtonComponent = {
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

export default filterGraphicButtonComponent;
