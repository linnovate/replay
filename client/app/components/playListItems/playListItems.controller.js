import _ from 'lodash';

class PlayListItemsController {

  constructor(PlayListService) {
    "ngInject";

    this.playlistSrv = PlayListService;
  }

  removeItem(item) {
    _.remove(this.items, item);
    this.playlistSrv.removeItem(item._id, item.list);
  }

}

export default PlayListItemsController;
