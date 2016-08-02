export default class VideoService {

  constructor($resource, ENV, dashJS) {
    "ngInject";

    this.$resource = $resource;
    this.videoPlayer = dashJS;
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
      this.videoPlayer.init(res.url, true);
      this.videoPlayer.setVisible(true);
    });
  }

  getVideoMetadata(videoId) {
    return this.$resource(this.ENV.API_URL+'/videometadata').query({
      videoId: videoId
    }).$promise;
  }

  getVideo(points, shapeType = 'polygon') {
    return this.$resource(this.ENV.API_URL+'/video').query({
      boundingShapeType: shapeType,
      boundingShapeCoordinates: JSON.stringify(points)
    }).$promise;
  }
}
