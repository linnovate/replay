class MapController {

  constructor($timeout, MapService, TrackService) {
    "ngInject";

    this.$timeout = $timeout;
    this.mapSrv = MapService;
    this.TrackSrv = TrackService;
  }

  $onInit() {
    this.$timeout(() => {
      this.mapSrv.init();
      this.TrackSrv.init();
    });
  }
}

export default MapController;
