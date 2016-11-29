import _ from 'lodash';

class PlayListController {

  constructor(PlayListService, DialogService) {
    "ngInject";

    this.playlistSrv = PlayListService;
    this.dialogSrv = DialogService;
  }

  $onInit() {
    this.playlistSrv.getPlaylist()
      .then((result) => this.playlist = result);
  }

  add() {
    let dialog = this.dialogSrv.showPrompt('Add new playlist');

    dialog.then((listName) => {
      if (!listName) return;

      // add to the remote, add to the list
      this.playlistSrv.addPlayList(listName)
        .then((result) => this.playlist.push(result));
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
