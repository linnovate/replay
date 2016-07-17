export default class VideoService {

  constructor($resource, ENV, dashJS) {
    "ngInject";

    this.$resource = $resource;
    this.videoPlayer = dashJS;
    this.Video = $resource(ENV.API_URL+'/video/:id', { id: '@id' });
    this.Stream = $resource(ENV.API_URL+'/dash/mpd/:id', { id: '@id' });
    this.searchVideo = $resource(ENV.API_URL+'/video/search-by-dist');
    this.rSearchByPolygon = $resource(ENV.API_URL+'/video/search-by-polygon');
    this.list = [];
    this.currentVideoId = '';
    this.$resource = $resource;
    this.ENV = ENV;
  }

  query(filter = {}) {
    this.list = this.Video.query(filter);
    return this.list.$promise;
  }

  getStream(videoId) {
    return this.Stream.get({id: videoId}).$promise;
  }

  playVideo(videoUri) {
    this.currentVideoId = videoUri;
    this.videoPlayer.init(videoUri, true);
    this.videoPlayer.setVisible(true);
  }

  searchByDist() {
    this.searchVideo.query().$promise.then(result => {
      console.log('searchByDist result: ', result);
    });
  }

  searchByPolygon(polygon) {
    console.log('polygon', polygon);
    return this.rSearchByPolygon.query({polygon: polygon}).$promise;
  }

  getMovieLocations() {
    return this.$resource(this.ENV.API_URL+'/video/get-movie-locations').query().$promise;
  }

  setStreamSamples() {
    return this.$resource(this.ENV.API_URL+'/video/set-stream-samples').get().$promise;
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
