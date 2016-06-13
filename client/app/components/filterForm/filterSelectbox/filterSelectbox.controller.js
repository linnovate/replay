class FilterSelectboxController {

  constructor() {
    this.options = [
      { name: 'wildcamps.com', value: 'wildcamps.com' },
      { name: 'supercamps.com', value: 'supercamps.com' },
      { name: 'megacamps.com', value: 'megacamps.com' },
      { name: 'coolcamps.com', value: 'coolcamps.com' }
    ];
    this.value = '';

  }

  changed() {
    this.onChange({
      controlType:  this.controlType,
      value:        this.value
    });
  }

  removeFilter(controlType) {
    this.onRemove({
      controlType:  controlType
    });
  }

}

export default FilterSelectboxController;
