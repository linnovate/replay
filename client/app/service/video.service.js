export default class VideoService {

  constructor($resource, ENV, dashJS) {
    "ngInject";

    this.$resource = $resource;
    this.videoPlayer = dashJS;
    this.Video = $resource(ENV.API_URL+'/video/:id', { id: '@id' });
    this.Stream = $resource(ENV.API_URL+'/dash/mpd/:id', { id: '@id' });
    this.searchVideo = $resource(ENV.API_URL+'/video/search-by-dist');
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

  playVideo(videoId) {
    this.currentVideoId = videoId;
    var stream = this.getStream(videoId).then((result) => {
      this.videoPlayer.init(result.url, true);
      this.videoPlayer.setVisible(true);
    });
  }

  searchByDist() {
    this.searchVideo.query().$promise.then(result => {
      console.log('searchByDist result: ', result);
    });
  }

  getMovieLocations() {
    return this.$resource(this.ENV.API_URL+'/video/get-movie-locations').query().$promise;
  }
}
