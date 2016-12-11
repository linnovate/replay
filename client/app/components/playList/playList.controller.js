class PlayListController {

  constructor(PlayListService, DialogService, $state, $transitions) {
    "ngInject";

    this.playlistSrv = PlayListService;
    this.dialogSrv = DialogService;
    this.$state = $state;

    // reload the list - there could be some changes: renamed, deleted
    $transitions.onStart({to: 'auth.map.playlist'}, (trans) => this.loadList());
  }

  loadList() {
    this.playlistSrv.getPlaylist()
      .then((result) => this.playlist = result);
  }

  $onInit() {
    this.loadList();
  }

  add() {
    let dialog = this.dialogSrv.showPrompt('Add new playlist');

    dialog.then((listName) => {
      if (!listName) return;

      // add to the remote, add to the list
      this.playlistSrv.addPlayList(listName)
        .then((result) => this.playlist.push(result));
    }, () => {
    })
  }

  onUpdateListName(list) {
    this.playlistSrv.updateListName(list._id, list.name)
      .then((result) => {
      });
  }

  onDeleteList(list) {
    let dialog = this.dialogSrv.showConfirm('Delete "' + list.name + '" playlist', 'Are you' +
      ' sure?');
    dialog.then(() => {
      this.playlistSrv.deleteList(list._id)
        .then((result) => {
          // reload list cause we just deleted one
          this.loadList();
          // go to playlist state
          this.$state.go('auth.map.playlist');
        });
    });

  }
}

export default PlayListController;
