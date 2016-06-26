import path from 'path';
import HeatMap from './heatmap.service';
import MapCircle from './circle.service';
import PolygonMapService from './polygon.service';

export default class MapService {

  constructor($mdDialog, VideoService) {
    "ngInject";

    this.mapId = 'map-main';
    this.startPoint = [32.0808800, 34.7805700];
    this.zoom = 13;
    this.$mdDialog = $mdDialog;
    this.videoSrv = VideoService;
  }

  init() {
    this.map = L.map(this.mapId, {}).setView(this.startPoint, this.zoom);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
      maxZoom: 18,
      attribution: 'Replay',
      id: 'mapbox.streets'
    }).addTo(this.map);

    // init heat class
    this.heat = new HeatMap(this.map, this.$mdDialog);
    this.circle = new MapCircle(this.map, this.$mdDialog);
    this.polygon = new PolygonMapService(this.map, this.$mdDialog);
  }


  addMoviePoints() {
    var map = this.map;

    this.videoSrv.getMovieLocations().then((result) => {
      _.each(result, function (item) {
        _.each(item.locations, function (loc) {
          L.marker(loc, {
            icon: L.icon({
              iconUrl: require('../assets/icon_dron.png'),
              iconSize: [32, 32]
            })
          }).addTo(map);
        });
      });
      console.log('locations', result);

    });
  }

}
