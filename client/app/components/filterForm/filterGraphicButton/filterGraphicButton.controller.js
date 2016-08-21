class FilterGraphicButtonController {

  constructor(MapService, safeApply) {
    "ngInject";

    this.options = null;
    this.value = '';
    this.mapSrv = MapService;
    this.safeApply = safeApply;

    this.init();
  }

  init() {
    this.options = [
      { icon: 'geometry:rectangle', value: 'rectangle', title: 'Rectangle' },
      { icon: 'geometry:polygon', value: 'polygon', title: 'Polygon' },
      { icon: 'geometry:circle', value: 'circle', title: 'Circle' }
    ];

    // draw:created
    this.mapSrv.map.on('draw:created', (e) => {
      this.value = null;
      this.safeApply();
    });
  }

  changed() {
    this.mapSrv.drawSearchSrv.startTool(this.value);

    this.onChange({
      controlType:  this.controlType,
      value:        this.value
    });

  }

  removeFilter(controlType) {
    this.mapSrv.drawSearchSrv.removeFrame();
    this.mapSrv.drawSearchSrv.activeHandlerDisable();
    this.onRemove({
      controlType:  controlType
    });
  }

}

export default FilterGraphicButtonController;
