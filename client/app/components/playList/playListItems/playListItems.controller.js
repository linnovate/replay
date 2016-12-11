import _ from 'lodash';

class PlayListItemsController {

  constructor(PlayListService, DialogService, $stateParams) {
    "ngInject";

    this.playlistSrv = PlayListService;
    this.dialogSrv = DialogService;
    this.$stateParams = $stateParams;
  }

  $onInit() {
    this.playlistSrv.getPlaylistById(this.$stateParams.playListId)
      .then(result => this.currentList = result);
  }

  updateListName(list) {
    let dialog = this.dialogSrv
      .showPrompt('Change playlist name', '', 'name', list.name);

    dialog.then((result) => {
      if (!result) return;

      list.name = result;
      this.onUpdateListName({list: list});
    })
  }

}

export default PlayListItemsController;
