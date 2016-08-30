import _ from 'lodash';

export default class PlayListService {

  constructor() {
    this._items = [
      {'_id': 1, 'playlist': '57c1d7f0a11062c5694de9b8', 'name': 'Video 1'},
      {'_id': 2, 'playlist': '57c1d7f0a11062c5694de9b8', 'name': 'Video 2'},
      {'_id': 3, 'playlist': '57c1d7f0a11062c5694de9b8', 'name': 'Video 3'},
      {'_id': 4, 'playlist': '57c1d7f0a11062c5694de9b8', 'name': 'Video 4'},
      {'_id': 5, 'playlist': '57c1d7f0a11062c5694de9b8', 'name': 'Video 5'},
      {'_id': 6, 'playlist': '57c1d7fca11062c5694de9b9', 'name': 'Video 6'},
      {'_id': 7, 'playlist': '57c1d7fca11062c5694de9b9', 'name': 'Video 7'},
      {'_id': 8, 'playlist': '57c1d7fca11062c5694de9b9', 'name': 'Video 8'},
      {'_id': 9, 'playlist': '57c1d7fca11062c5694de9b9', 'name': 'Video 9'},
      {'_id': 10, 'playlist': '57c1d7fca11062c5694de9b9', 'name': 'Video 10'},
      {'_id': 11, 'playlist': '57c1d7fea11062c5694de9ba', 'name': 'Video 11'},
      {'_id': 12, 'playlist': '57c1d7fea11062c5694de9ba', 'name': 'Video 12'},
      {'_id': 13, 'playlist': '57c1d7fea11062c5694de9ba', 'name': 'Video 13'},
      {'_id': 14, 'playlist': '57c1d7fea11062c5694de9ba', 'name': 'Video 14'},
      {'_id': 15, 'playlist': '57c1d7fea11062c5694de9ba', 'name': 'Video 15'},
      {'_id': 16, 'playlist': '57c1d7fea11062c5694de9ba', 'name': 'Video 16'},
      {'_id': 17, 'playlist': '57c1d7ffa11062c5694de9bb', 'name': 'Video 17'},
      {'_id': 18, 'playlist': '57c1d7ffa11062c5694de9bb', 'name': 'Video 18'},
      {'_id': 19, 'playlist': '57c1d7ffa11062c5694de9bb', 'name': 'Video 19'},
      {'_id': 20, 'playlist': '57c1d7ffa11062c5694de9bb', 'name': 'Video 20'},
      {'_id': 21, 'playlist': '57c1d800a11062c5694de9bc', 'name': 'Video 21'},
      {'_id': 22, 'playlist': '57c1d800a11062c5694de9bc', 'name': 'Video 22'},
      {'_id': 23, 'playlist': '57c1d800a11062c5694de9bc', 'name': 'Video 23'},
      {'_id': 24, 'playlist': '57c1d800a11062c5694de9bc', 'name': 'Video 24'},
      {'_id': 25, 'playlist': '57c1d800a11062c5694de9bc', 'name': 'Video 25'},
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

  addItem(item) {
    if (!this.isItemAdded(video)) this._items.push(item);
  }

  removeItem(item) {
    if (this.isItemAdded(video)) _.remove(this._items, ['_id', item._id])
  }

  isItemAdded(id) {
    return !!_.find(this._items, ['_id', id]);
  }

  getPlaylist(id = null, limit = 10) {
    return id ? _.filter(this._playlist, ['_id', id]) : _.slice(this._playlist, 0, limit);
  }

  /**
   * Returns all items that belong certain playlist ID
   * @param id Playlist ID
   * @returns {Array.<T>|*}
   */
  getItemsByListId(id) {
    if (!id) return;

    return _.filter(this._items, ['playlist', id]);
  }

  getItemsCountByListId(id) {
    if (!id) return;

    return _.filter(this._items, ['playlist', id]).length;
  }

}
