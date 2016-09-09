import HeatMap from './heatmap.service';
import DrawSearchService from './drawSearch.service';
import _ from 'lodash';

export default class MapService {

  constructor($mdDialog, VideoService, FilterFormService, $q) {
    "ngInject";

    this._mapDeferred = $q.defer();
    this.mapId = 'map-main';
    this.startPoint = [32.0808800, 34.7805700]; // Tel-aviv
    // this.startPoint = [27.105208, 35.527510];
    this.zoom = 13;
    this.$mdDialog = $mdDialog;
    this.videoSrv = VideoService;
    this.filterFormSrv = FilterFormService;
    this._movingGroup = new L.FeatureGroup();
    this._boundingGroup = new L.FeatureGroup();
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
      layers: [streetsTile, this._movingGroup, this._boundingGroup]
    });
    baseLayers = {
      "Grayscale": grayscaleTile,
      "Streets": streetsTile
    };
    overlays = {
      "Bounding shape": this._boundingGroup
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
        '<b>Name: </b>' + '<br /><b>ID: </b>' + props._id
          : 'Do some search then hover on result');
    };
    this.ctrlInfo.addTo(this.map);
    // add layer control
    L.control.layers(baseLayers, overlays).addTo(this.map);

    // init heat class
    this.heat = new HeatMap(this.map, this.$mdDialog);
    this.drawSearchSrv = new DrawSearchService(this.map);

    this._mapDeferred.resolve(this.map);
  }

  getMap() {
    return this._mapDeferred.promise;
  }

  searchVideo() {
    var map = this.map,
      params = {},
      filter = this.filterFormSrv.values;

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

    this._boundingGroup.clearLayers();
    this.videoSrv.getVideo(params).then((result) => {
      this.videoSrv.list = result;
      _.each(result, (vItem) => {
        this.renderBoundingGroup(vItem.boundingPolygon);
      });
    });
  }

  renderBoundingGroup(boundingFeature) {
    this.geojson = L.geoJson(boundingFeature, {
      style: this.style.bind(this),
      onEachFeature: this.onEachFeature.bind(this)
    }).bindLabel('Bounding polygon').addTo(this._boundingGroup);
  }

  clearMovingGroup() {
    this._movingGroup.clearLayers();
  }

  renderMovingGroup(featureCollection) {
    this.clearMovingGroup();

    this.geojson = L.geoJson(featureCollection, {
      style: this.style.bind(this),
      onEachFeature: this.onEachFeature.bind(this)
    }).bindLabel('Moving object').addTo(this._movingGroup);
  }

  style(feature) {
    var bounding = feature.geometry.type == 'MultiPolygon';

    return {
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: bounding ? '3' : '',
      fillOpacity: bounding ? 0.3 : 1,
      fillColor: bounding ? 'green' : 'magenta'
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

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}
