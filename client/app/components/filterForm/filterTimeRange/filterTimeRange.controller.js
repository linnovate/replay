class FilterTimeRangeController {

  constructor($scope) {
    "ngInject";

    this.$scope = $scope;

    this.$scope.$watch('valueFrom', this.coolNumberChanged());

    /*this.$scope.$watch('valueTo', (newValue, oldValue) => {
      this.onChange({
        controlType:  this.controlType,
        value:        { from: this.valueFrom, to: newValue }
      });
    });*/

  }

  coolNumberChanged(newValue, oldValue) {
    return () => {
      this.onChange({
        controlType:  this.controlType,
        value:        { from: newValue, to: this.valueTo }
      });
    };
  }

}

export default FilterTimeRangeController;
