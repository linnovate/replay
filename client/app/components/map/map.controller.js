import L from 'leaflet/dist/leaflet-src';
import        'leaflet/dist/leaflet.css';

class MapController {
  constructor() {
    this.name = 'map';

    setTimeout(() => this.init(), 1000);


/*    L.marker([51.5, -0.09]).addTo(mymap)
      .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

    L.circle([51.508, -0.11], 500, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5
    }).addTo(mymap).bindPopup("I am a circle.");

    L.polygon([
      [51.509, -0.08],
      [51.503, -0.06],
      [51.51, -0.047]
    ]).addTo(mymap).bindPopup("I am a polygon.");


    var popup = L.popup();

    function onMapClick(e) {
      popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
    }

    mymap.on('click', onMapClick);*/


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
      .bindPopup("Dron covered area, video will started now")
      .on('click', function (e) {

      })
  }
}

export default MapController;
