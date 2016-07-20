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

    //this.addMoviePoints();
    this.addSearchPoints();
  }


  addMoviePoints() {
    var map = this.map,
      points = [];

    this.videoSrv.getMovieLocations().then((result) => {
      _.each(result, function (item) {
        _.each(item.locations, function (loc) {
          points.push(loc);
        });
        L.polygon(points, {
          stroke: false,
          fillColor: '#08780e',
          fillOpacity: 0.5
        }).bindLabel(item.name).addTo(map);

        points = [];
      });
      console.log('locations', result);
    });
  }

  searchByPolygon() {
    var polPoints = [];
    _.each(this.polygon.polygon.getLatLngs(), function (item) {
      polPoints.push({"lon": item.lng, "lat": item.lat});
    });

    this.videoSrv.searchByPolygon(JSON.stringify(polPoints)).then((result) => {
      var foundPolygons = _.map(result, 'name').join(', ');
      if (foundPolygons) this.showAlert(foundPolygons, 'Video found');
      console.log('searchByPolygon', result);

    });
  }

  setStreamSamples() {
    this.videoSrv.setStreamSamples().then((result) => {
      console.log('setStreamSamples', result);
    });
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

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  searchVideo() {
    var map = this.map,
      searchPoints = [];

    if (!this.polygon.polygon) {
      this.showAlert('Use polygon tool to define search area');
      return;
    }

    searchPoints = this.polygon.polygon.toGeoJSON().geometry.coordinates;

    this.videoSrv.getVideo(searchPoints).then((result) => {
      _.each(result, (item) => {
        this.videoSrv.getVideoMetadata(item._id).then((meta) => {
          _.each(meta, (metaItem) => {
            metaItem.sensorTrace.type = this.capitalizeFirstLetter(metaItem.sensorTrace.type);
            L.geoJson(metaItem.sensorTrace, {
              stroke: false,
              fillColor: '#08780e',
              fillOpacity: 0.5
            }).addTo(map);
          });
        });

      });
    });
  }

}
