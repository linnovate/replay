import _ from 'lodash';

export default class DrawSearch {

  constructor(map) {
    // interface
    this.enabled = false;
    this.activeTool = null;

    // ------------------------------- //
    this.map = map;
    this._drawGroup = new L.FeatureGroup();
    this._frame = null;
    this._activeHandler = null;

    L.drawLocal.draw.handlers.rectangle.tooltip.start = 'Click and drag to define search frame';
    L.drawLocal.draw.handlers.circle.tooltip.start = 'Click and drag to define search circle';
    L.drawLocal.draw.handlers.simpleshape.tooltip.end = 'Release mouse to finish';

    this.init();
  }

  /**
   * Check if the search shape is drawn and ready to use
   * @returns {boolean}
     */
  isReady() {
    return !_.isEmpty(this._frame);
  }

  init() {
    this.map.addLayer(this._drawGroup);
    // draw:created
    this.map.on('draw:created', (e) => {
      var type = e.layerType;
      this._frame = e.layer;
      this._drawGroup.addLayer(this._frame);
    });
    // draw:drawstart
    this.map.on('draw:drawstart', (e) => {
      var type = e.layerType;

      this.removeFrame();
    });
  }

  getFrame() {
    if (!this.isReady()) {
      console.error('DrawSearch: search shape is not defined');
      return;
    }

    var result = {};
    result.type = this.activeTool;

    switch (result.type) {
      case 'circle':

        break;

      default:
        result.geometry = this._frame.toGeoJSON().geometry.coordinates;
    }

    return result;
  }

  startTool(name) {
    if (!_.isEmpty(this._activeHandler)) this._activeHandler.disable();

    switch (name) {
      case 'rectangle':
        this._activeHandler = new L.Draw.Rectangle(this.map);
        break;

      case 'polygon':
        this._activeHandler = new L.Draw.Polygon(this.map);
        break;

      case 'circle':
        this._activeHandler = new L.Draw.Circle(this.map);
        break;
    }

    this._activeHandler.enable();
  }

  removeFrame() {
    this._drawGroup.clearLayers();
    this._frame = null;
  }

}
