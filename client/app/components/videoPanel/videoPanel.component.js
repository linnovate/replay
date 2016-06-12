import template from './videoPanel.html';
import controller from './videoPanel.controller';
import './videoPanel.styl';

let videoPanelComponent = {
  restrict: 'E',
  bindings: {
    video: '<',
    favourite: '@'
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default videoPanelComponent;
