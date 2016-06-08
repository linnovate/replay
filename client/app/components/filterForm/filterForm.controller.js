class FilterFormController {

  constructor(FilterFormService) {
    "ngInject";

    this.filterFormSrv = FilterFormService;
  }

  onChange(controlType, value) {
    this.filterFormSrv.values[controlType] = value;
  }

  showResults() {
    console.log('Form data: ', this.filterFormSrv.values);
  }

}

export default FilterFormController;
