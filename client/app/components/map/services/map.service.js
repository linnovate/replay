import path from 'path';
import HeatMap from './heatmap.service';
import MapCircle from './circle.service';
import PolygonMapService from './polygon.service';
import _ from 'lodash';

export default class MapService {

  constructor($mdDialog, VideoService) {
    "ngInject";

    this.mapId = 'map-main';
    // this.startPoint = [32.0808800, 34.7805700]; // Tel-aviv
    this.startPoint = [27.105208, 35.527510];
    this.zoom = 15;
    this.$mdDialog = $mdDialog;
    this.videoSrv = VideoService;
    // container for the search frame
    this.searchContainer = new L.FeatureGroup();
    this.searchFrame = null;
    // path of the found video streams
    this.foundCaptures = new L.FeatureGroup();
  }

  init() {
    this.map = L.map(this.mapId, {drawControl: true}).setView(this.startPoint, this.zoom);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
      maxZoom: 18,
      attribution: 'Replay',
      id: 'mapbox.streets'
    }).addTo(this.map);

    // init heat class
    this.heat = new HeatMap(this.map, this.$mdDialog);
    this.circle = new MapCircle(this.map, this.$mdDialog);
    this.polygon = new PolygonMapService(this.map, this.$mdDialog);

    this.addSearchPoints();

    this.map.addLayer(this.foundCaptures);
    // search frame (leaflet.draw)
    this.map.addLayer(this.searchContainer);
    this.map.on('draw:created', (e) => {
      var type = e.layerType;
      this.searchFrame = e.layer;
      this.searchContainer.addLayer(this.searchFrame);
    });

    this.map.on('draw:drawstart', (e) => {
      var type = e.layerType;

      if (type === 'rectangle') {
        this.searchContainer.clearLayers();
      }

    });
  }

  searchVideo() {
    var map = this.map,
      searchPoints = [];

    if (!this.searchFrame) {
      this.showAlert('Select search area first');
      return;
    }

    this.foundCaptures.clearLayers();
    searchPoints = this.searchFrame.toGeoJSON().geometry.coordinates;

    this.videoSrv.getVideo(searchPoints).then((result) => {
      _.each(result, (item) => {
        this.videoSrv.getVideoMetadata(item._id).then((meta) => {
          _.each(meta, (metaItem) => {
            metaItem.sensorTrace.type = this.capitalizeFirstLetter(metaItem.sensorTrace.type);
            this.foundCaptures.addLayer(
              L.geoJson(metaItem.sensorTrace, {
                stroke: false,
                fillColor: '#08780e',
                fillOpacity: 0.5
              })
            );
          });
        });
      });
    });
  }

  addSearchPoints() {
    var points = [
      [27.105208, 35.527510],
      [27.106178, 35.524920],
      [27.109094, 35.525464],
      [27.105208, 35.527510]
    ];
    L.polygon(points, {
      color: 'red',
      weight: 2,
    }).bindLabel('Search area').addTo(this.map);
  }

  showAlert(msg, title = 'Interesting fact...', btnCaption = 'OK') {
    this.$mdDialog.show(
      this.$mdDialog.alert()
        .parent(angular.element(document.getElementById('map-main')))
        .clickOutsideToClose(true)
        .title(title)
        .textContent(msg)
        .ariaLabel('Alert Dialog Demo')
        .ok(btnCaption)
    );
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}
