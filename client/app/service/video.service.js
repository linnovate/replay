import endPoint from '../config/endpoint';

export default class videoService {

  constructor($resource) {
    "ngInject";

    this.$resource = $resource;
    this.Video = $resource(endPoint.base+'/video/:id', { id: '@id' });
    this.list = [];
  }

  query(filter = {}) {
    this.list = this.Video.query(filter);
    return this.list.$promise;
  }

  getStream(videoId) {
    return endPoint.base+'/dash/mpd/'+videoId;
  }
}
