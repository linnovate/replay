var _ = require('lodash');

export default class PolygonMapService {

  constructor(map, $mdDialog) {
    this.map = map;
    this.$mdDialog = $mdDialog;
    this.enabled = false;
    this.points = [];
    this.markers = [];
    this.polygon = null;
  }

  toggle() {
    this.enabled = !this.enabled;

    if (this.enabled) {
      this.showAlertSample('Hold ALT key and click on map to build polygon, release ALT and click to finish poligon');
      this.on();
    } else {
      this.off();
    }
  }

  on() {
    this.map.on({
      click: this.buildPolygon,
    }, this);
  }

  off() {
    this.map.off({
      click: this.buildPolygon,
    }, this);
  }

  buildPolygon(e) {

    if (e.originalEvent.altKey) {
      if (!this.points.length && this.polygon) {
        this.map.removeLayer(this.polygon);
        _.each(this.markers, (marker) => {
          this.map.removeLayer(marker);
        });
        delete this.polygon;
        this.markers = [];
      }

      this.points.push(e.latlng);

      this.markers.push(L.marker(e.latlng, {
        icon:  L.icon({
          iconUrl: require('../assets/icon_dron.png'),
          //iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
          iconSize: [32, 32],
          //iconAnchor: [12, 40],
          //popupAnchor: [-3, -76],
          //shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
          //shadowRetinaUrl: 'my-icon-shadow@2x.png',
          //shadowSize: [68, 95],
          //shadowAnchor: [22, 94]
        })
      }).addTo(this.map));
    } else if (this.points.length > 2) {
      this.polygon = L.polygon(this.points);
      this.polygon.addTo(this.map);
      this.points = [];
    }
  }

  showAlertSample(msg) {
    this.$mdDialog.show(
      this.$mdDialog.alert()
        .parent(angular.element(document.getElementById('map-main')))
        .clickOutsideToClose(true)
        .title('Interesting fact...')
        .textContent(msg)
        .ariaLabel('Alert Dialog Demo')
        .ok('Got it!')
        //.targetEvent(ev)
    );
  }

  randomInteger(min, max) {
    var rand = min + Math.random() * (max - min);
    rand = Math.round(rand);
    return rand;
  }
}
