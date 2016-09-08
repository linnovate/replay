import _ from 'lodash';

class PlayListItemsController {

  constructor(PlayListService, DialogService, $stateParams) {
    "ngInject";

    this.playlistSrv = PlayListService;
    this.dialogSrv = DialogService;
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

  editList(list) {
    let dialog = this.dialogSrv.showPrompt('Change playlist name', '', 'name', list.name);

    dialog.then((result) => {
      if (!result) return;

      list.name = result;
      this.onEditList({list: list});
    })
  }

}

export default PlayListItemsController;
