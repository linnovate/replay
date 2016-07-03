class MapController {

  constructor($timeout, MapService) {
    "ngInject";

    this.$timeout = $timeout;
    this.map = MapService;
  }

  init() {
    this.map.init();
  }

  $onInit() {
    this.$timeout(() => {
      this.init()
    });
  }
}

export default MapController;
