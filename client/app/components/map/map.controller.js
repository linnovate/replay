class MapController {

  constructor($timeout, MapService) {
    "ngInject";

    this.$timeout = $timeout;
    this.mapSrv = MapService;
  }

  $onInit() {
    this.$timeout(() => {
      this.mapSrv.init();
    });
  }
}

export default MapController;
