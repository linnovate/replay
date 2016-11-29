export default class MissionService {

  constructor($resource, ENV, dashJS) {
    "ngInject";

    this.$resource = $resource;
    this.dashJSrv = dashJS;
    this.Stream = $resource(ENV.API_URL+'/media/:id', { id: '@id' });
    this.list = [];
    this.currentVideoId = '';
    this.$resource = $resource;
    this.ENV = ENV;
  }

  getStream(videoId) {
    return this.Stream.get({id: videoId}).$promise;
  }

  playVideo(videoId) {
    this.currentVideoId = videoId;
    this.getStream(videoId).then((res) => {
      this.dashJSrv.init(res.url, true);
    });
  }

  getVideoMetadata(videoId) {
    return this.$resource(this.ENV.API_URL+'/videometadata').query({
      videoId: videoId
    }).$promise;
  }

  getMission(params = {}) {
    return this.$resource(this.ENV.API_URL+'/mission').query(params).$promise;
  }
}
