export default class VideoService {

  constructor($resource, ENV, dashJS) {
    "ngInject";

    this.$resource = $resource;
    this.dashJSrv = dashJS;
    this.Video = $resource(ENV.API_URL+'/video/:id', { id: '@id' });
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
      this.dashJSrv.setVisible(true);
    });
  }

  getVideoMetadata(videoId) {
    return this.$resource(this.ENV.API_URL+'/videometadata').query({
      videoId: videoId
    }).$promise;
  }

  getVideo(params = {}) {
    return this.$resource(this.ENV.API_URL+'/video').query(params).$promise;
  }
}
