import _ from 'lodash';

export default class PlayListService {

  constructor(MissionService, $resource, ENV) {
    "ngInject";

    this.missionSrv = MissionService;
    this.$resource = $resource;
    this.resPlaylist = this.$resource(ENV.API_URL+'/playlist/:id');

    this._items = [
      {'_id': 1, 'list': '57c1d7f0a11062c5694de9b8'},
      {'_id': 2, 'list': '57c1d7f0a11062c5694de9b8'},
      {'_id': 3, 'list': '57c1d7f0a11062c5694de9b8'},
      {'_id': 4, 'list': '57c1d7f0a11062c5694de9b8'},
      {'_id': 5, 'list': '57c1d7f0a11062c5694de9b8'},
      {'_id': 11, 'list': '57c1d7fea11062c5694de9ba'},
      {'_id': 12, 'list': '57c1d7fea11062c5694de9ba'},
      {'_id': 13, 'list': '57c1d7fea11062c5694de9ba'},
      {'_id': 14, 'list': '57c1d7fea11062c5694de9ba'},
      {'_id': 15, 'list': '57c1d7fea11062c5694de9ba'},
      {'_id': 16, 'list': '57c1d7fea11062c5694de9ba'},
      {'_id': 17, 'list': '57c1d7ffa11062c5694de9bb'},
      {'_id': 18, 'list': '57c1d7ffa11062c5694de9bb'},
      {'_id': 19, 'list': '57c1d7ffa11062c5694de9bb'},
      {'_id': 20, 'list': '57c1d7ffa11062c5694de9bb'},
      {'_id': 21, 'list': '57c1d800a11062c5694de9bc'},
      {'_id': 22, 'list': '57c1d800a11062c5694de9bc'},
      {'_id': 23, 'list': '57c1d800a11062c5694de9bc'},
      {'_id': 24, 'list': '57c1d800a11062c5694de9bc'},
      {'_id': 25, 'list': '57c1d800a11062c5694de9bc'},
    ];

    this._itemsMeta = [
      {'_id': 1, 'name': 'Video 1'},
      {'_id': 2, 'name': 'Video 2'},
      {'_id': 3, 'name': 'Video 3'},
      {'_id': 4, 'name': 'Video 4'},
      {'_id': 5, 'name': 'Video 5'},
      {'_id': 6, 'name': 'Video 6'},
      {'_id': 7, 'name': 'Video 7'},
      {'_id': 8, 'name': 'Video 8'},
      {'_id': 9, 'name': 'Video 9'},
      {'_id': 10, 'name': 'Video 10'},
      {'_id': 11, 'name': 'Video 11'},
      {'_id': 12, 'name': 'Video 12'},
      {'_id': 13, 'name': 'Video 13'},
      {'_id': 14, 'name': 'Video 14'},
      {'_id': 15, 'name': 'Video 15'},
      {'_id': 16, 'name': 'Video 16'},
      {'_id': 17, 'name': 'Video 17'},
      {'_id': 18, 'name': 'Video 18'},
      {'_id': 19, 'name': 'Video 19'},
      {'_id': 20, 'name': 'Video 20'},
      {'_id': 21, 'name': 'Video 21'},
      {'_id': 22, 'name': 'Video 22'},
      {'_id': 23, 'name': 'Video 23'},
      {'_id': 24, 'name': 'Video 24'},
      {'_id': 25, 'name': 'Video 25'},
      {'_id': '57b576ae3a70e1cf65b0b829', 'name': 'Cool video'},
    ];

    this._playlist = [
      {
        '_id': '57c1d7f0a11062c5694de9b8',
        'name': 'Favourites',
      },
      {
        '_id': '57c1d7fca11062c5694de9b9',
        'name': 'Watched',
      },
      {
        '_id': '57c1d7fea11062c5694de9ba',
        'name': 'List 1',
      },
      {
        '_id': '57c1d7ffa11062c5694de9bb',
        'name': 'List 2',
      },
      {
        '_id': '57c1d800a11062c5694de9bc',
        'name': 'List 3',
      }
    ];
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

  getPlaylist(id = null, limit = 10) {
    return this.resPlaylist.query().$promise;
  }

  addItem(id, listId) {
    if (!id || !listId) return;

    this._items.push({
      _id: id,
      list: listId
    });
  }

  removeItem(id, listId) {
    _.remove(this._items, {_id: id, list: listId});
  }



  removePlayList(listId) {
    _.remove(this._playlist, {_id: listId });
  }

  isItemAdded(id, listId) {
    // return !!_.find(this._items, ['_id', id]);
  }

  getVideoMetaById(id) {
    if (!id) return;

    return _.find(this._itemsMeta, ['_id', id]);
  }

  /**
   * Returns all items that belong certain playlist ID
   * @param id Playlist ID
   * @returns {Array.<T>|*}
   */
  getItemsByListId(listId) {
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
  }

}

const watchedId = '57c1d7fca11062c5694de9b9';
const favouritesId = '57c1d7f0a11062c5694de9b8';
