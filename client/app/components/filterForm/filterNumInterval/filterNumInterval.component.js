import template from './filterNumInterval.html';
import controller from './filterNumInterval.controller';
import './filterNumInterval.styl';

let filterNumIntervalComponent = {
  restrict: 'E',
  bindings: {
    controlType: '@',
    label: '@',
    labelIcon: '@',
    labelMin: '@',
    labelMax: '@',
    valueMin: '@',
    valueMax: '@',
    onChange: '&',
    onRemove: '&'
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default filterNumIntervalComponent;
