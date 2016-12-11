import _ from 'lodash';

export default class PlayListService {

  constructor(MissionService, $resource, ENV) {
    "ngInject";

    this.missionSrv = MissionService;
    this.$resource = $resource;
    this.resPlaylist = this.$resource(ENV.API_URL+'/playlist/:id', {id: '@id'}, {
      'update': { method: 'PUT' }
    });
  }

  /**
   * Add new playlist
   * @param name
   * @return promise on save
   */
  addPlayList(name) {
    if (!name) {
      console.error('no name provided for new playlist');
      return;
    }

    var list = new this.resPlaylist();
    list.name = name;
    return list.$save();
  }

  getPlaylist(limit = 10) {
    return this.resPlaylist.query({limit: limit}).$promise;
  }

  getPlaylistById(id = null) {
    return this.resPlaylist.get({id: id}).$promise;
  }

  updateListName(id, name) {
    return this.resPlaylist.update({ id: id }, {name: name }).$promise;
  }

  deleteList(id) {
    return this.resPlaylist.delete({id: id}).$promise;
  }

/*  addItem(id, listId) {
    if (!id || !listId) return;

    this._items.push({
      _id: id,
      list: listId
    });
  }

  removeItem(id, listId) {
    _.remove(this._items, {_id: id, list: listId});
  }*/


  getVideoMetaById(id) {
    if (!id) return;

    return _.find(this._itemsMeta, ['_id', id]);
  }

  /**
   * Returns all items that belong certain playlist ID
   * @param id Playlist ID
   * @returns {Array.<T>|*}
   */
/*  getItemsByListId(listId) {
    if (!listId) return;

    return _.map(_.filter(this._items, ['list', listId]), (item) => {
      return _.assign(item, {name: this.getVideoMetaById(item._id).name});
    });
  }

  getItemsCountByListId(id) {
    if (!id) return;

    return _.filter(this._items, ['list', id]).length;
  }

  playVideo(id) {
    // TODO: TMP! REMOVE AFTERWORDS!
    this.addItem(id, watchedId);
    id = '57b576ae3a70e1cf65b0b829';
    this.missionSrv.playVideo(id);
  }*/

}

const watchedId = '57c1d7fca11062c5694de9b9';
const favouritesId = '57c1d7f0a11062c5694de9b8';
