import template from './filterTimeRange.html';
import controller from './filterTimeRange.controller';
import './filterTimeRange.styl';

let filterTimeRangeComponent = {
  restrict: 'E',
  bindings: {
    controlType: '@',
    label: '@',
    labelIcon: '@',
    labelFrom: '@',
    labelTo: '@',
    valueFrom: '@',
    valueTo: '@',
    onChange: '&',
    onRemove: '&'
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default filterTimeRangeComponent;
