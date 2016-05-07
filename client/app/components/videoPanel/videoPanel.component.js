import template from './videoPanel.html';
import controller from './videoPanel.controller';
import './videoPanel.styl';

let videoPanelComponent = {
  restrict: 'E',
  bindings: {
    video: '<'
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default videoPanelComponent;
