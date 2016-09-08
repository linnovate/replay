import _ from 'lodash';

class PlayListController {

  constructor(PlayListService, DialogService) {
    "ngInject";

    this.playlistSrv = PlayListService;
    this.dialogSrv = DialogService;
  }

  $onInit() {
    this.playlist = this.playlistSrv.getPlaylist();
  }

  add() {
    let dialog = this.dialogSrv.showPrompt('Add new playlist');

    dialog.then((result) => {
      if (!result) return;

      this.playlistSrv.addPlayList(result);
      this.playlist = this.playlistSrv.getPlaylist();
    }, () => {
      console.log('dialog', 'you hit cancel');
    })
  }

  onEditList(list) {
    console.debug('onEditList', list);
  }

  onDeleteList(list) {
    console.debug('onDeleteList', list);
  }
}

export default PlayListController;
