import heatmap from 'leaflet.heat';

export default class MapService {

  constructor(dashJS) {
    "ngInject";

    this.video = dashJS;
    this.mapId = 'map-main';
    this.startPoint = [32.0808800, 34.7805700];
    this.zoom = 13;
    this.draw = true;
  }

  init() {
    this.map = L.map(this.mapId).setView(this.startPoint, this.zoom);
    this.heat = L.heatLayer([], {radius: 15}).addTo(this.map);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
      maxZoom: 18,
      attribution: 'Replay',
      id: 'mapbox.streets'
    }).addTo(this.map);
  }

  toggleCircle(videoSM) {
    L.circle([32.0808800, 34.7805700], 500, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5
    }).addTo(this.map)
      .bindPopup("Dron covered area, video will start now")
      .on('click', (e) => {
        this.video.init(videoSM, true);
        this.video.setVisible(true);
      });
  }

  toggleHeatmap() {
    this.map.on({
      movestart: () => { this.draw = false; },
      moveend:   () => { this.draw = true; },
      mousemove: (e) => {
        if (this.draw) {
          this.heat.addLatLng(e.latlng);
        }
      }
    });
  }


}
