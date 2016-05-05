import L from 'leaflet/dist/leaflet-src';
import        'leaflet/dist/leaflet.css';
const videoSM = 'http://178.79.165.97:1935/vod/mp4:sample.mp4/manifest.mpd';

class MapController {

  constructor(dashJS, $timeout) {
    "ngInject";

    this.name = 'map';
    this.video = dashJS;
    this.$timeout = $timeout;
  }

  init() {
    var mymap = L.map('mapid').setView([32.0808800, 34.7805700], 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
      maxZoom: 18,
      attribution: 'Replay',
      id: 'mapbox.streets'
    }).addTo(mymap);

    L.circle([32.0808800, 34.7805700], 500, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5
    }).addTo(mymap)
      .bindPopup("Dron covered area, video will start now")
      .on('click', (e) => {
        this.video.init(videoSM, true);
        this.video.setVisible(true);
      })
  }

  $onInit() {
    this.$timeout(() => {
      this.init()
    });
  }
}

export default MapController;
