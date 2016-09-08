import template from './playListItems.html';
import controller from './playListItems.controller';
import './playListItems.styl';

let playListItemsComponent = {
  restrict: 'E',
  bindings: {
    onDeleteItem: '&',
    onEditList: '&',
    onDeleteList: '&'
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default playListItemsComponent;
