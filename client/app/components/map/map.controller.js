import L from 'leaflet/dist/leaflet-src';
import        'leaflet/dist/leaflet.css';

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
