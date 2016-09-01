import template from './playListItems.html';
import controller from './playListItems.controller';
import './playListItems.styl';

let playListItemsComponent = {
  restrict: 'E',
  bindings: {
    items: '<',
    currentList: '<'
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default playListItemsComponent;
