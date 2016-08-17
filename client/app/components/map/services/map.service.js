import HeatMap from './heatmap.service';
import MapCircle from './circle.service';
import PolygonMapService from './polygon.service';
import DrawSearchService from './drawSearch.service';
import _ from 'lodash';

export default class MapService {

  constructor($mdDialog, VideoService, FilterFormService) {
    "ngInject";

    this.mapId = 'map-main';
    // this.startPoint = [32.0808800, 34.7805700]; // Tel-aviv
    this.startPoint = [27.105208, 35.527510];
    this.zoom = 15;
    this.$mdDialog = $mdDialog;
    this.videoSrv = VideoService;
    this.filterFormSrv = FilterFormService;
    this._captureGroup = new L.FeatureGroup();
    this.geojson = null;
    this._mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw';
  }

  init() {
    // setting up basic and additional layers
    var grayscaleTile,
      streetsTile,
      baseLayers,
      overlays;

    grayscaleTile = L.tileLayer(this._mbUrl, {id: 'mapbox.light', attribution: 'Replay'});
    streetsTile = L.tileLayer(this._mbUrl, {id: 'mapbox.streets', attribution: 'Replay'});

    this.map = L.map(this.mapId, {
      center: this.startPoint,
      zoom: this.zoom,
      layers: [grayscaleTile, this._captureGroup]
    });
    baseLayers = {
      "Grayscale": grayscaleTile,
      "Streets": streetsTile
    };
    overlays = {
      "Search": this._captureGroup
    };

    // info control
    this.ctrlInfo = L.control();
    this.ctrlInfo.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
      this.update();
      return this._div;
    };
    this.ctrlInfo.update = function (props) {
      this._div.innerHTML = '<h4>Search details</h4>' + (props ?
        '<b>Name: </b>' + props.video.name + '<br /><b>ID: </b>' + props._id
          : 'Do some search then hover on result');
    };
    this.ctrlInfo.addTo(this.map);
    // add layer control
    L.control.layers(baseLayers, overlays).addTo(this.map);

    // init heat class
    this.heat = new HeatMap(this.map, this.$mdDialog);
    this.circle = new MapCircle(this.map, this.$mdDialog);
    this.polygon = new PolygonMapService(this.map, this.$mdDialog);
    this.drawSearchSrv = new DrawSearchService(this.map);
  }

  searchVideo() {
    var map = this.map,
      params = {},
      filter = this.filterFormSrv.values;

    console.log('filter', JSON.stringify(filter, null, 4));

    if (this.drawSearchSrv.isReady()) {
      params.boundingShapeType = 'Polygon';
      params.boundingShapeCoordinates = JSON.stringify(this.drawSearchSrv.getFrame().geometry);
    }

    if (!_.isUndefined(filter['source'])) {
      params['sourceId'] = filter['source'];
    }

    if (!_.isEmpty(filter['tag'])) {
      params['tagsIds'] = JSON.stringify(filter['tag']);
    }

    if (!_.isEmpty(filter['timeRange'])) {
      if (!_.isUndefined(filter['timeRange'].from))
        params['fromVideoTime'] = filter['timeRange'].from;
      if (!_.isUndefined(filter['timeRange'].to))
        params['toVideoTime'] = filter['timeRange'].to;
    }

    if (!_.isEmpty(filter['length'])) {
      if (!_.isUndefined(filter['length'].min))
        params.minVideoDuration = filter['length'].min;

      if (!_.isUndefined(filter['length'].max))
        params.maxVideoDuration = filter['length'].max;
    }

    console.log('params', JSON.stringify(params, null, 4));

    this._captureGroup.clearLayers();

    this.videoSrv.getVideo(params).then((result) => {
      this.videoSrv.list = result;
      _.each(result, (vItem) => {
        this.videoSrv.getVideoMetadata(vItem._id).then((meta) => {
          var featureCollection = this.convertToFeatures(meta, {'video': vItem});
          this.geojson = L.geoJson(featureCollection, {
            style: this.style.bind(this),
            onEachFeature: this.onEachFeature.bind(this)
          }).bindLabel('Found object').addTo(this._captureGroup);
        });
      });
    });
  }

  getColor() {
    return 'green';
  }

  style(feature) {
    return {
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7,
      fillColor: this.getColor()
    };
  }

  highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
      layer.bringToFront();
    }

    this.ctrlInfo.update(layer.feature.properties);
  }

  resetHighlight(e) {
    this.geojson.resetStyle(e.target);
    this.ctrlInfo.update();
  }

  zoomToFeature(e) {
    this.map.fitBounds(e.target.getBounds());
  }

  onEachFeature(feature, layer) {
    layer.on({
      mouseover: this.highlightFeature.bind(this),
      mouseout: this.resetHighlight.bind(this),
      click: this.zoomToFeature.bind(this)
    });
  }

  convertToFeatures(incoming, addData = {}) {
    var collection = {
      type: 'FeatureCollection',
      features: []
    };

    _.each(incoming, (item) => {
      collection.features.push({
        type: 'Feature',
        properties: _.merge(addData, _.pick(item, [
          '_id',
          'sourceId',
          'videoId',
          'timestamp',
          'data',
          'sensorPosition']
        )),
        geometry: {
          type: this.capitalizeFirstLetter(item.sensorTrace.type),
          coordinates: item.sensorTrace.coordinates
        }
      })
    });

    return collection;
  }

  _addSearchPoints() {
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
