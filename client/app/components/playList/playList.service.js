import _ from 'lodash';

export default class PlayListService {

  constructor(MissionService, $resource, ENV, DialogService, $q) {
    "ngInject";

    this.missionSrv = MissionService;
    this.$resource = $resource;
    this.dialogSrv = DialogService;
    this._q = $q;

    this.playlistData = [];
    this.resPlaylist = this.$resource(ENV.API_URL + '/playlist/:id', {id: '@id'}, {
      'update': {method: 'PUT'}
    });
    this.resMission = this.$resource(ENV.API_URL + '/playlist/:id/mission/:missionId',
      {id: '@id', missionId: '@missionId'}, {
        'update': {method: 'PUT'}
      });
  }

  /**
   * Add new playlist
   * @param name
   * @return promise on save
   */
  addPlaylist(name) {
    if (!name) {
      console.error('no name provided for new playlist');
      return;
    }

    var list = new this.resPlaylist();
    list.name = name;
    return list.$save().then((result) => this.playlistData.push(result));
  }

  addPlaylistDlg(callback) {
    let dialog = this.dialogSrv.showPrompt('Add new playlist');

    dialog.then((name) => {
      if (!name) return;

      // add to the remote, add to the list
      this.addPlaylist(name)
        .then((result) => callback(result));
    }, () => {
    });
  }

  getPlaylist(force = false, limit = 10) {
    if (this.playlistData.length && !force) {
      console.log('getPlaylist cached');
      return this._q.when(this.playlistData);
    } else {
      console.log('getPlaylist REST');
      return this.resPlaylist.query({limit: limit}).$promise.then((response) => {
        this.playlistData = response;
        return this.playlistData;
      });
    }
  }

  getPlaylistById(id = null) {
    return this.resPlaylist.get({id: id}).$promise;
  }

  updateListName(id, name) {
    return this.resPlaylist.update({id: id}, {name: name}).$promise.then(() => {
      _.each(this.playlistData, (item) => {
        if (item._id == id) item.name = name;
      })
    });
  }

  deleteList(id) {
    return this.resPlaylist.delete({id: id}).$promise.then(() => {
      _.remove(this.playlistData, {_id: id});
    });
  }

  addMission(listId, missionId) {
    return this.resMission.update({id: listId, missionId: missionId}).$promise.then((result) => {
      // very silly to reload a WHOLE playlist array because no new mission
      // object is returned from REST
      this.getPlaylist(true);
      // if PUT would return mission object...
      // _.each(this.playlistData, (item, i) => {
      //   if (item._id == listId) {
          //   item.missions.push(result);
        // }
      // });
    });
  }

  deleteMission(listId, missionId) {
    return this.resMission.delete({id: listId, missionId: missionId}).$promise.then(() => {
      _.each(this.playlistData, (item, i) => {
        if (item._id == listId) {
          // Find item index using indexOf+find
          var mIndex = _.indexOf(item.missions, _.find(item.missions, {_id: missionId}));
          item.missions.splice(mIndex, 1);
      // if PUT would return mission object...
          // _.remove(item, {_id: missionId});
        }
      });
    });
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
