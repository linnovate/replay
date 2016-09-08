import _ from 'lodash';

class PlayListItemsController {

  constructor(PlayListService, $stateParams) {
    "ngInject";

    this.playlistSrv = PlayListService;
    this.$stateParams = $stateParams;
  }

  $onInit() {
    this.items = this.playlistSrv.getItemsByListId(this.$stateParams.playListId);
    this.currentList = this.playlistSrv.getPlaylist(this.$stateParams.playListId)[0];
  }

  removeItem(item) {
    _.remove(this.items, item);
    this.playlistSrv.removeItem(item._id, item.list);
    this.onDeleteItem(item);
  }

}

export default PlayListItemsController;
