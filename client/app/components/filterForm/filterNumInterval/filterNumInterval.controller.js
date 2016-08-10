class FilterNumIntervalController {

  constructor() {
    this.valueMin = 0;
    this.valueMax = 3600;

    this.changed();
  }

  changed() {
    if (this.valueMin > this.valueMax) this.valueMax = this.valueMin;
    this.onChange({
      controlType:  this.controlType,
      value:        { min: this.valueMin, max: this.valueMax }
    });
  }
}

export default FilterNumIntervalController;
