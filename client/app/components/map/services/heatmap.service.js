import hmLib from 'leaflet.heat';

export default class HeatMap {

  constructor(map, $mdDialog) {
    this.map = map;
    this.$mdDialog = $mdDialog;
    this.heat = L.heatLayer([], {radius: 15}).addTo(this.map);
    this.enabled = false;
  }

  drawToggle() {
    this.enabled = !this.enabled;

    if (this.enabled) {
      this.showAlertSample('Hold ALT key to draw the heat map');
      this.map.on({
        mousemove: this._mousemove
        /*click: (e) => {
         console.log(e.latlng);
         L.marker(e.latlng, {
         icon:  L.icon({
         iconUrl: require('./assets/icon_dron.png'),
         //iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
         iconSize: [64, 64],
         //iconAnchor: [12, 40],
         //popupAnchor: [-3, -76],
         //shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
         //shadowRetinaUrl: 'my-icon-shadow@2x.png',
         //shadowSize: [68, 95],
         //shadowAnchor: [22, 94]
         })
         }).addTo(this.map);
         }*/
      }, this);
    } else {
      this.map.off({
        mousemove: this._mousemove
      }, this);
    }
  }

  _mousemove(e) {
    if (e.originalEvent.altKey) {
      this.heat.addLatLng(e.latlng);
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

}
