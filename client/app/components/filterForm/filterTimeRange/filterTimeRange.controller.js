class FilterTimeRangeController {

  constructor($scope) {
    "ngInject";

    this.$scope = $scope;
    this.valueFrom = '';
    this.valueTo = '';

    this.$scope.$watch(() => this.valueFrom, this.updateFrom.bind(this));
    this.$scope.$watch(() => this.valueTo, this.updateTo.bind(this));
  }

  updateFrom(newValue) {
    this.onChange({
      controlType:  this.controlType,
      value: { from: newValue, to: this.valueTo }
    });
  }

  updateTo(newValue) {
    this.onChange({
      controlType:  this.controlType,
      value: { from: this.valueFrom, to: newValue }
    });
  }

}

export default FilterTimeRangeController;
