export default class videoService {

  constructor($resource, ENV) {
    "ngInject";

    this.$resource = $resource;
    this.Video = $resource(ENV.API_URL+'/video/:id', { id: '@id' });
    this.Stream = $resource(ENV.API_URL+'/dash/mpd/:id', { id: '@id' });
    this.list = [];
  }

  query(filter = {}) {
    this.list = this.Video.query(filter);
    return this.list.$promise;
  }

  getStream(videoId) {
    return this.Stream.get({id: videoId}).$promise;
  }
}
