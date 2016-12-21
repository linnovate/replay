import _ from 'lodash';

export default class QuerySaverService {

  constructor($resource, ENV, $q) {
    "ngInject";

    this.$resource = $resource;
    this._q = $q;
    this.data = [
      {
        "_id" : "5835c227c6b5060df2add3ca",
        "name": "My saved query 1",
        "minVideoDuration" : 0,
        "maxVideoDuration" : 3600,
      },
      {
        "_id" : "585931c6cb6bda6ee128a584",
        "name": "My saved query 2",
        "minVideoDuration" : 0,
        "maxVideoDuration" : 1600,
      },
      {
        "_id" : "585931cecb6bda6ee128a585",
        "name": "My saved query 3",
        "minVideoDuration" : 0,
        "maxVideoDuration" : 600,
      },
    ];

    // this._resource = this.$resource(ENV.API_URL + '/queries/:id', {id: '@id'}, {
    //   'update': {method: 'PUT'}
    // });
  }

  getItems(force = false, limit = 10) {
    if (this.data.length && !force) {
      console.log('getPlaylist cached');
      return this._q.when(this.data);
    } else {
      console.log('querySaver REST');
      // return this._resource.query({limit: limit}).$promise.then((response) => {
      //   this.data = response;
      //   return this.data;
      // });
    }
  }

}
